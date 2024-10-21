import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ProskommaContext } from "../context/proskommaContext";
import { I18nContext } from "../context/i18nContext";
import SplashScreenXenizo from "../components/SplashScreen";
import { BIBLE_DATA } from "../constants";

SplashScreen.preventAutoHideAsync();

const bibleFiles = require.context('../assets/bible', false, /\.json$/);
const bibleData = bibleFiles.keys().reduce((acc, fileName) => {
  const data = bibleFiles(fileName);
  if(fileName !== "./release-metadata.json"){
    acc.bible.push(data.content);
  } else {
    acc.metadata = data;
  }
  return acc;
}, { bible: [], metadata: {} });

export default function IndexScreen() {
  const router = useRouter();
  const { pk } = useContext(ProskommaContext);
  const { setLanguage } = useContext(I18nContext);
  const [isReady, setIsReady] = useState(false);

  let [fontsLoaded] = useFonts({
    'NotoSans': require('../assets/fonts/Noto/NotoSans-Regular.ttf'),
    'NotoSansItalic': require('../assets/fonts/Noto/NotoSans-Italic.ttf'),
    'NotoSansItalicRegular': require('../assets/fonts/Noto/NotoSans-Italic.ttf'),
    'NotoSansItalicMedium': require('../assets/fonts/Noto/NotoSans-MediumItalic.ttf'),
    'NotoSansRegular': require('../assets/fonts/Noto/NotoSans-Regular.ttf'),
    'NotoSansMedium': require('../assets/fonts/Noto/NotoSans-Medium.ttf'),
    'NotoSansBold':require('../assets/fonts/Noto/NotoSans-Bold.ttf'),
  });
  useEffect(() => {
    async function prepare(){
      SplashScreen.preventAutoHideAsync();
    }
    prepare()
  }, []);

  useEffect(() => {
    async function loadResources() {
      if (!isReady) {
        // Require all JSON files from the assets/bible directory
        const { bible: contentStrings, metadata } = bibleData;
        const selectors = {
          source: "door43",
          project: metadata.identifier,
          revision: metadata.version
        }
        const contentType = "usfm"
        const filterOptions = undefined
        
        const emptyBlocks = undefined
        const tags = [
          `title:${metadata.title}`,
          `copyright:${metadata.rights}`,
          `language:${metadata.language.identifier}`,
          `owner:${metadata.publisher}`,
          `direction:${metadata.language.direction}`,
          `script:${metadata.language.title}`
        ]
        const customTags = undefined
        try {
          const docSetId = pk.findOrMakeDocSet(selectors);
          pk.docSetById(docSetId).tags = tags;
          pk.importDocuments(
            selectors,
            contentType,
            contentStrings,
            filterOptions,
            customTags,
            emptyBlocks,
            tags
          );
        }catch(error){
          console.log(error);
        }
        setLanguage("es" || BIBLE_DATA.languageCode); // Set the language
        setIsReady(true); // Mark as ready
      }
    }

    loadResources();
  }, []);

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded && isReady) {
        await SplashScreen.hideAsync();
        router.push("/test");
      }
    }

    hideSplashScreen();
  }, [isReady, fontsLoaded]);

  if (!fontsLoaded || !isReady) {
    return null; // Return null while waiting for resources to load
  }

  return (
    <View>
      <SplashScreenXenizo />
    </View>
  );
}
