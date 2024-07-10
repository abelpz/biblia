import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { SofriaRenderFromProskomma } from "proskomma-json-tools";
import sofria2WebActions from "../utils/sofria2WebActions";
import { renderers } from "../utils/renderReactNative";

export function ReadingScreenAllBook({
  currentChap,
  setIsOnTop,
  pk,
  fontSize,
  fontFamily,
  documentResult,
  bibleFormat,
}) {
  const [chapterBuffer, setChapterBuffer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [option, setOption] = useState({
    showWordAtts: false,
    showTitles: true,
    showHeadings: true,
    showIntroductions: true,
    showFootnotes: true,
    showXrefs: true,
    showParaStyles: true,
    showCharacterMarkup: false,
    showVersesLabels: true,
    showChapterLabels: true,
    selectedBcvNotes: [1],
    chapters: [`${currentChap}`],
    byVerse: bibleFormat === "byVerse",
    bcvNotesCallback: (bcv) => {},
    fontConfig: {
      fontFamily: fontFamily,
      fontSize: fontSize,
    },
    renderers,
  });

  useEffect(() => {
    setOption((prev) => ({
      ...prev,
      chapters: [`${currentChap}`],
      byVerse: bibleFormat === "byVerse",
      fontConfig: {
        fontFamily: fontFamily,
        fontSize: fontSize,
      },
    }));
  }, [currentChap, fontSize, fontFamily, bibleFormat]);

  useEffect(() => {
    setIsLoading(true);
  }, [documentResult, option]);

  useEffect(() => {
    if (documentResult) {
      const timeoutId = setTimeout(() => {
        try {
          const result = renderDoc(documentResult, pk, option);
          setChapterBuffer(result.paras);
        } catch (error) {}
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [documentResult,option]);

  useEffect(() => {
    setIsLoading(false);
  }, [chapterBuffer]);

  return isLoading ? (
    <View
      style={{
        width: "100%",
        height: "75%",
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator />
    </View>
  ) : (
    <ScrollView
      onScroll={(e) => setIsOnTop(e.nativeEvent.contentOffset.y > 0)}
      style={{ paddingHorizontal: 10, height: "80%" }}
    >
      {chapterBuffer.map((c, id) => (
        <View key={id}>{c}</View>
      ))}
    </ScrollView>
  );
}

export function renderDoc(documentResult, pk, option) {
  let output = {};
  let workspace = { tr: 0 };
  let context = {};
  let config = option;
  if (documentResult) {
    const renderer = new SofriaRenderFromProskomma({
      proskomma: pk,
      actions: sofria2WebActions,
    });

    try {
      renderer.renderDocument1({
        docId: documentResult,
        config,
        output,
        workspace,
        context,
      });
    } catch (err) {
      console.error("Renderer error:", err);
      throw err;
    }
  }
  return output;
}

export async function useDocumentQuery(livre, bible, pk) {
  let documentQuery = `
          {
            document(docSetId: "${bible}" withBook: "${livre}"){
              id
              cvIndexes {
                chapter
              }
          }}
          `;
  const documentResult = await pk.gqlQuery(documentQuery);
  return documentResult;
}

function BibleSelection({ pk, setBibleName, bible, setBible, setVisible }) {
  const [checked, setChecked] = React.useState(bible);
  let docSetids = useRef(
    pk.gqlQuerySync(
      `{
      docSets(withBook: "TIT") 
      {
        tags
        id
      }
    }`
    )
  );
  return (
    <View>
      {docSetids.current.data.docSets.map((doc, id) => (
        <View
          key={id}
          style={{ justifyContent: "space-between", flexDirection: "row" }}
        >
          <View style={{ width: "80%", marginTop: 10 }}>
            <Text style={{ color: "black" }}>
              {doc.tags.length > 0 ? doc.tags[0].split(":")[1] : doc.id}
            </Text>
          </View>
          <RadioButton
            style={{ alignSelf: "end" }}
            value={doc.id}
            color="blue"
            status={checked === doc.id ? "checked" : "unchecked"}
            onPress={() => {
              setBibleName(
                doc.tags.length > 0 ? doc.tags[0].split(":")[1] : doc.id
              );
              setChecked(`${doc.id}`);
              setBible(doc.id);
              setVisible(false);
            }}
          />
        </View>
      ))}
    </View>
  );
}
export { BibleSelection };
