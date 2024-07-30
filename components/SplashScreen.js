import { View, Image } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useContext } from "react";
import { ColorThemeContext } from "../context/colorThemeContext";
export default function SplashScreenXenizo() {
  const { colors } = useContext(ColorThemeContext);
  const theme = "dark";
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: colors.schemes[theme].themeApp,
        justifyContent: "center",
        alignItems: "center",
        gap: 31,
      }}
    >
      <Image
        source={
          theme === "light"
            ? require("../assets/icons/SplashScreen/Icon2.png")
            : require("../assets/icons/SplashScreen/Icon2Dark.png")
        }
      />
      <ActivityIndicator size={"large"} />
    </View>
  );
}
