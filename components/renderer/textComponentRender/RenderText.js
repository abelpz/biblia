import { ScrollView } from "react-native";
import { renderers } from "../utils/renderReactNative";
import { SofriaRenderFromProskomma } from "proskomma-json-tools";
import sofria2WebActions from "../utils/sofria2WebActions";
import { ActivityIndicator } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { View } from "react-native";

export function ReadingScreenAllBook({
  currentChap,
  setIsOnTop,
  pk,
  fontSize,
  documentResult,
}) {
  const [chapterBuffer, setChapterBuffer] = useState(null);

  const [option, setOption] = useState({
    showWordAtts: true,
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
    bcvNotesCallback: (bcv) => {},
    displayPartOfText: { state: "begin" },
    fontConfig: {
      fontFamily: "Gentium",
      fontVariant: fontSize,
    },
    renderers,
  });
  useEffect(() => {
    setChapterBuffer(null);
    setOption((prev) => {
      t = { ...prev };
      t.chapters = [`${currentChap}`];
      t.fontConfig.fontSize = fontSize;
      return t;
    });
  }, [currentChap, fontSize]);
  // Fetch new document if bible or livre is changed

  // If document is changed, reset ChapterBuffer with new values
  useEffect(() => {
    if (documentResult) {
      setChapterBuffer(renderDoc(documentResult, pk, option).paras);
    }
  }, [documentResult]);

  return chapterBuffer ? (
    <ScrollView
      onScroll={(e) => setIsOnTop(e.nativeEvent.contentOffset.y > 0)}
      style={{ paddingHorizontal: 10, height: "80%" }}
    >
      {chapterBuffer.map((c, id) => (
        <View key={id}>{c}</View>
      ))}
    </ScrollView>
  ) : (
    <View
      style={{
        width: "100%",
        height: "75%",
        margin:5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator />
    </View>
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
