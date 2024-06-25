import { View, Image } from "react-native";
import { Text } from 'react-native-paper';

export default function SplashScreenXenizo() {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: "rgba(84, 90, 146, 1)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={require("../assets/icons/SplashScreen/Logo.png")} />
      <Text style={{color:'white'}} variant="displaySmall">Katesthio</Text>
    </View>
  );
}
