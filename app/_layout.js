import { Stack, Slot } from "expo-router";
import { View, Image } from "react-native";
import { Text } from "react-native-paper";
import { ProskommaProvider } from "../context/proskommaContext";
import { I18nProvider } from "../context/i18nContext";
import { ColorThemeProvider } from "../context/colorThemeContext";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useLayoutEffect } from "react";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <I18nProvider>
      <ProskommaProvider>
        <ColorThemeProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerTitleAlign: "center",
                headerShown: false,
                headerTitle: () => (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../assets/icons/SplashScreen/IconSplash.png")}
                      style={{ width: 24, height: 24 }}
                    />
                    <Text style={{ marginLeft: 6 }} variant="titleLarge">
                      Sunalizo
                    </Text>
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="test"
              options={{
                headerShown: false,
                gestureEnabled: false, // Disable gesture navigation
              }}
            />
          </Stack>
        </ColorThemeProvider>
      </ProskommaProvider>
    </I18nProvider>
  );
}
