import { ScrollView } from "react-native";
import { renderers } from "../utils/renderReactNative";
import { SofriaRenderFromProskomma } from "proskomma-json-tools";
import sofria2WebActions from "../utils/sofria2WebActions";
import { ActivityIndicator } from "react-native-paper";
import React, { useState, useEffect } from 'react';
import { View } from "react-native";

export function ReadingScreenAllBook({ setIsOnTop , livre, bible, pk }) {
    const [documentResult, setDocResults] = useState(null);
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
        chapters: ["1","2"],
        bcvNotesCallback: (bcv) => {},
        displayPartOfText: { state: "begin" },
        fontConfig: {
            fontFamily: 'Gentium',
            fontSize: 24,
        },
        renderers,
    });

    // Fetch new document if bible or livre is changed
    useEffect(() => {
        async function fetchDocument() {
            const result = await useDocumentQuery(livre, bible, pk);
            setDocResults(result);
        }
        fetchDocument();
    }, [livre, bible]);

    // If document is changed, reset ChapterBuffer with new values
    useEffect(() => {
        if (documentResult) {
            setChapterBuffer(renderDoc(documentResult, pk, option).paras);
        }
    }, [documentResult]);

    var startTime = performance.now();

    return (
        chapterBuffer ? (
            <ScrollView onScroll={(e) => setIsOnTop(e.nativeEvent.contentOffset.y > 0)} style={{ paddingHorizontal: 10 }}>
                {chapterBuffer.map((c, id) => (
                    <View key={id}>
                        {c}
                    </View>
                ))}
            </ScrollView>
        ) : (
            <View style={{ width:'100%',height:'100%', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        )
    );}

export function renderDoc(documentResult, pk, option) {
    var startTime = performance.now();
    let output = {};
    let workspace = { tr: 0 };
    let context = {};
    let config = option;
    if (documentResult) {
        const renderer = new SofriaRenderFromProskomma({
            proskomma: pk,
            actions: sofria2WebActions,
        });
        console.log(`1er ${performance.now() - startTime} milliseconds.`);

        startTime = performance.now();

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
    console.log(`2eme ${performance.now() - startTime} milliseconds.`);

    return output;
}

async function useDocumentQuery(livre, bible, pk) {
    let documentQuery = `
        {
          document(docSetId: "${bible}" withBook: "${livre}"){
            id
            cvIndexes {
              chapter
              verses {
                verse {
                  verseRange
                }
              }
            }
        }}
        `;
    const documentResult = await pk.gqlQuery(documentQuery);
    return documentResult;
}
