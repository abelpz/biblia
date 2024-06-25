import { ScrollView } from "react-native";
import { renderers } from "../utils/renderReactNative";
import { SofriaRenderFromProskomma } from "proskomma-json-tools";
import sofria2WebActions from "../utils/sofria2WebActions";
import { ActivityIndicator } from "react-native-paper";
import React, { useState, useEffect } from 'react';
import { View } from "react-native";
export function ReadingScreenAllBook({ setIsOnTop ,livre, bible, pk }) {
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
      chapters:["3"],
      bcvNotesCallback: (bcv) => {
      },
      displayPartOfText: { state: "begin" },
      renderers,
    });
  
    //if document is changed reset ChapterBuffer with null values
    useEffect(() => {
        
      setChapterBuffer(prev => renderDoc(documentResult, pk, option).paras) 
      
    }, [documentResult?.data?.document?.id]);
    //Fetch new document if bible or livre is changed
    useEffect(() => {
      setDocResults(useDocumentQuery(livre, bible, pk));
    }, [livre, bible]);
  
    //if current chap is change or any option or the document then we check if we have already loaded the current chap
    // or the next one if not load them.
    var startTime = performance.now()

    return (
        
      <ScrollView onScroll={(e) => setIsOnTop(e.nativeEvent.contentOffset.y > 0)} style={{paddingHorizontal:10}}>
        {chapterBuffer?
        chapterBuffer.map((c, id) => {
          if (c) {
            return (
              <View>
                {c}
              </View>
            );
          }
        }):<View style={{flex:1,alignItems:'center'}}><ActivityIndicator/></View>}
        {      console.log(`3eme ${performance.now() - startTime} milliseconds.`)
    }
      </ScrollView>
      
  )
  }
  

  export function renderDoc(documentResult, pk, option) {
    var startTime = performance.now()
    let output = {};
    let workspace = { tr: 0 };
    let context = {};
    let config = option;
    if (documentResult) {
      const renderer = new SofriaRenderFromProskomma({
        proskomma: pk,
        actions: sofria2WebActions,
      });
      console.log(`1er ${performance.now() - startTime} milliseconds.`)

      startTime = performance.now()

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
    console.log(`2eme ${performance.now() - startTime} milliseconds.`)

    return output;
  }
  
  function useDocumentQuery(livre, bible, pk) {
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
    const documentResult = pk.gqlQuerySync(documentQuery);
    return documentResult;
  }
  