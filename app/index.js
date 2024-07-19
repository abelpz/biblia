import React, { useContext, useEffect, useState } from "react";
import { View, Button, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from 'expo-font';

import { ProskommaContext } from "../context/proskommaContext";
import { I18nContext } from "../context/i18nContext";
import SplashScreenXenizo from "../components/SplashScreen";
export default function IndexScreen() {
  const router = useRouter();
  const { pk } = useContext(ProskommaContext);
  const { setLanguage } = useContext(I18nContext);
  const [isReady, setIsReady] = useState(false);
    // eas build -p android --profile preview

  let [fontsLoaded] = useFonts({
    // 'Gentium': require('../assets/fonts/Gentium/GentiumPlus-Regular.ttf'),
    // 'Gentium-Bold': require('../assets/fonts/Gentium/GentiumPlus-Bold.ttf'),
    // 'Gentium-Italic': require('../assets/fonts/Gentium/GentiumPlus-Italic.ttf'),
    // 'Gentium-BoldItalic': require('../assets/fonts/Gentium/GentiumPlus-BoldItalic.ttf'),
    // 'Roboto': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
    // 'Roboto-Bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
    // 'Roboto-Italic': require('../assets/fonts/Roboto/Roboto-Italic.ttf'),
    // 'Roboto-BoldItalic': require('../assets/fonts/Roboto/Roboto-BoldItalic.ttf'),
    // 'Andika': require('../assets/fonts/Andika/Andika-Regular.ttf'),
    // 'Andika-Bold': require('../assets/fonts/Andika/Andika-Bold.ttf'),
    // 'Andika-BoldItalic': require('../assets/fonts/Andika/Andika-BoldItalic.ttf'),
    // 'Andika-BoldItalic': require('../assets/fonts/Andika/Andika-Regular.ttf'),
    'NotoSans':require('./assets/fonts/Noto/NotoSans-Regular.ttf'),
    'NotoSans-Regular':require('./assets/fonts/Noto/NotoSans-Regular.ttf'),
    'NotoSans-Medium':require('./assets/fonts/Noto/NotoSans-Medium.ttf'),

  });

  useEffect(() => {
    if (!isReady) {
      const psle = require("./assets/Succinct/psle_succinctTest.json");
      Object.keys(psle).map(k => {pk.loadSuccinctDocSet(psle[k].content)})
      // psle.map(e => pk.loadSuccinctDocSets(e))

      setLanguage("fr"); // Set the language

      setIsReady(true); // Mark as ready
    }
  }, []);

  useEffect(() => {
    if (isReady) {
      router.push("/test");
    }
  }, [isReady]);

  if (!isReady) {
    return (
      <View>
        <SplashScreenXenizo/>
      </View>
    );
  }

  return (
    <View>
        <SplashScreenXenizo/>
      </View>
  );
}
