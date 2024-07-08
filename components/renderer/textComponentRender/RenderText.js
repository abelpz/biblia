import { ScrollView } from "react-native";
import { renderers } from "../utils/renderReactNative";
import { SofriaRenderFromProskomma } from "proskomma-json-tools";
import sofria2WebActions from "../utils/sofria2WebActions";
import verseByVerseActions from "../utils/verseByVerseActions";
import { ActivityIndicator, Text } from "react-native-paper";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { View } from "react-native";

export function ReadingScreenAllBook({
  currentChap,
  setIsOnTop,
  pk,
  fontSize,
  fontFamily,
  documentResult,
}) {
  const [chapterBuffer, setChapterBuffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
    byVerse:true,
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
      fontConfig: {
        fontFamily: fontFamily,
        fontSize: fontSize,
      },
    }));
  }, [currentChap, fontSize, fontFamily]);

  useEffect(() => {
    if (documentResult) {
      setIsLoading(true);
      const timeoutId = setTimeout(() => {
        setChapterBuffer(renderDoc(documentResult, pk, option).paras);
        setIsLoading(false);
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [documentResult, option]);

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
        docId: documentResult.data.document.id,
        config,
        output,
        workspace,
        context,
      });
    } catch (err) {
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


export function renderDocForSideBySide(documentResult, pk, livre, bible, textNumber) {
  let output = {};
  let workspace = { textRef: `${bible}_${livre}_$${textNumber}`, textNumber: textNumber };
  let context = {};
  let config = {
      showWordAtts: false,
      showTitles: true,
      showHeadings: true,
      showIntroductions: true,
      showFootnotes: true,
      showXrefs: true,
      showParaStyles: true,
      showCharacterMarkup: true,
      showVersesLabels: true,
      
      excludeScopeTypes: ["milestone", "attribute", "spanWithAtts"],
      showChapterLabels: true,
  }
  if (documentResult) {
      const renderer = new SofriaRenderFromProskomma({
          proskomma: pk,
          actions: actions,
      });
      try {
          renderer.renderDocument1({
              docId: documentResult.data.document.id,
              config,
              output,
              workspace,
              context,
          });

      } catch (err) {
          console.log("Renderer", err);
          throw err;
      }
  }

  return output;
}

