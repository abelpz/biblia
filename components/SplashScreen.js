import { View, Image } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useContext } from "react";
import { ColorThemeContext } from "../context/colorThemeContext";
export default function SplashScreenXenizo() {
  const { colors, theme } = useContext(ColorThemeContext);
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "rgba(223, 224, 255, 1)",
        justifyContent: "center",
        alignItems: "center",
        gap:31,
      }}
    >
      <Image
        source={require("../assets/icons/SplashScreen/Icon2.png")}
      />
      <ActivityIndicator size={'large'}/>
    </View>
  );
}
