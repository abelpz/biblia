import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from 'expo-font';
import ButtonNavigationForFirstTab from "../components/ButtonNavigationForFirstTab";
import { ProskommaContext } from "../context/proskommaContext";
import { I18nContext } from "../context/i18nContext";
import { Button } from "react-native-paper";


export default function App() {
  const { pk } = useContext(ProskommaContext);
  const { i18n,setLanguage} = useContext(I18nContext);
  setLanguage('fr')
  // Load all font styles with mapping
  let [fontsLoaded] = useFonts({
    'Gentium': require('../assets/fonts/Gentium/GentiumPlus-Regular.ttf'),
    'Gentium-Bold': require('../assets/fonts/Gentium/GentiumPlus-Bold.ttf'),
    'Gentium-Italic': require('../assets/fonts/Gentium/GentiumPlus-Italic.ttf'),
    'Gentium-BoldItalic': require('../assets/fonts/Gentium/GentiumPlus-BoldItalic.ttf'),
    'Roboto' :  require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Bold' :  require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Italic' :  require('../assets/fonts/Roboto/Roboto-Italic.ttf'),
    'Roboto-BoldItalic' :  require('../assets/fonts/Roboto/Roboto-BoldItalic.ttf'),
    // 'Roboto-Black' :  require('../assets/fonts/Roboto/Roboto-Black.ttf'),
    // 'Roboto-BlackItalic' :  require('../assets/fonts/Roboto/Roboto-BlackItalic.ttf'),
    // 'Roboto-Light' :  require('../assets/fonts/Roboto/Roboto-Light.ttf'),
    // 'Roboto-LightItalic' :  require('../assets/fonts/Roboto/Roboto-LightItalic.ttf'),
    // 'Roboto-Medium' :  require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
    // 'Roboto-MediumItalic' :  require('../assets/fonts/Roboto/Roboto-MediumItalic.ttf'),
    // 'Roboto-Thin' :  require('../assets/fonts/Roboto/Roboto-Thin.ttf'),
    // 'Roboto-ThinItalic' :  require('../assets/fonts/Roboto/Roboto-ThinItalic.ttf'),
    'Andika' :  require('../assets/fonts/Andika/Andika-Regular.ttf'),
    'Andika-Bold' :  require('../assets/fonts/Andika/Andika-Bold.ttf'),
    'Andika-BoldItalic' :  require('../assets/fonts/Andika/Andika-BoldItalic.ttf'),
    'Andika-BoldItalic' :  require('../assets/fonts/Andika/Andika-Regular.ttf'),



  });
  useEffect(() => {
    const psle = require('../assets/Succinct/psle_succinct.json');
    const psl2 = require('../assets/Succinct/psle_succinc.json');

    pk.loadSuccinctDocSet(psle);
    pk.loadSuccinctDocSet(psl2)
  }, []);

  if (!fontsLoaded) {
    return <View></View>;
  }
    // eas build -p android --profile preview



  return (
    <View style={styles.container}>
      <ButtonNavigationForFirstTab />
      <Button onPress={()=> {
        styles.text.fontSize = 40
        }}>Plus 2</Button>
      <Text style={[styles.text, { fontWeight: 'normal' }]}>This is regular text</Text>
      <Text style={[{fontSize:18,fontFamily:'Gentium-Bold' }]}>This is bold text</Text>
      <Text style={[{ fontWeight: 'bold',fontSize:18,fontFamily:'Gentium' }]}>This is bold text</Text>
      <Text style={[{ fontWeight: 'bold',fontSize:18 }]}>This is bold text</Text>

      <Text style={[styles.text, { fontStyle: 'italic' }]}>This is italic text</Text>
      <Text style={[styles.text, { fontWeight: 'bold', fontStyle: 'italic' }]}>This is bold italic text</Text>
      <Text>{i18n.t('greeting')}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: 'Gentium',
    fontSize: 18,
  },
});