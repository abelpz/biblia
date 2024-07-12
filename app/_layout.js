import { Stack } from "expo-router";
import { View, Image } from "react-native";
import { Text } from "react-native-paper";
import { ProskommaProvider } from "../context/proskommaContext";
import { I18nProvider } from "../context/i18nContext";
import { ColorThemeProvider } from "../context/colorThemeContext";
export default function RootLayout() {
  return (
    <I18nProvider>
      <ProskommaProvider>
      <ColorThemeProvider>

        <Stack>
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerTitle: () => (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/icons/SplashScreen/Logo.png")}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={{ marginLeft: 6 }} variant="titleLarge">
                  Sunalizo
                  </Text>
                </View>
              ),
            }}
            name="index"
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="test"
          />
        </Stack>
        </ColorThemeProvider>

      </ProskommaProvider>
    </I18nProvider>
  );
}
