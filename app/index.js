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
  });
  useEffect(() => {
    const psle = require('../assets/Succinct/psle_succinct.json');
    pk.loadSuccinctDocSet(psle);
  }, []);

  if (!fontsLoaded) {
    return <View></View>;
  }



  return (
    <View style={styles.container}>
      <ButtonNavigationForFirstTab />
      <Button onPress={()=> {
        styles.text.fontSize = 40
        console.log(styles)
        }}>Plus 2</Button>
      <Text style={[styles.text, { fontWeight: 'normal' }]}>This is regular text</Text>
      <Text style={[styles.text, { fontWeight: 'bold' }]}>This is bold text</Text>
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