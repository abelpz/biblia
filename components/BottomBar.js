import { StyleSheet } from "react-native";
import { View, TouchableOpacity } from "react-native";
import {
  ArrowLeftGreyIcon,
  ArrowRightGreyIcon,
  ArrowDownIcon,
  LoopIcon,
} from "../assets/icons/flavorIcons/icons";
import { useRef, useContext } from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import { IconButton } from "react-native-paper";
import { ColorThemeContext } from "../context/colorThemeContext";
export default function BottomBar({
  currentBook,
  setCurrentChap,
  currentChap,
  documentResult,
  setIsModalVisible,
}) {
  const { colors, theme } = useContext(ColorThemeContext);
  const styles = StyleSheet.create({
    bottomContainer: {
      height: 80,
      width: "100%",
      backgroundColor: colors.schemes[theme].surfaceContainer,
      alignItems: "center", // Center items horizontally
      flexDirection: "row",
      padding: 24,
      justifyContent: "space-between", // Center items vertically
    },
    customButton: {
      borderWidth: 1,
      borderRadius: 9,
      margin: 0,
      padding: 0,
      borderColor: colors.schemes[theme].outline,
      borderStyle: "solid",
      alignItems: "center",
      flexDirection: "row",
      height: 32,
      paddingVertical: 6,
      paddingRight: 8,
      paddingLeft: 16,
      alignSelf: "center",
    },
    buttonInnerContent: {
      height: 32,
      gap: 8,

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    InsideOfTheBottomBar: { gap: 8, flexDirection: "row" },
  });

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.InsideOfTheBottomBar}>
        {documentResult ? (
          <>
            <IconButton
              onPress={() => {
                setCurrentChap((prev) => {
                  if (prev >= 2) {
                    return prev - 1;
                  } else {
                    return prev;
                  }
                });
              }}
              icon={() => (
                <ArrowLeftGreyIcon
                  style={{ margin: 8 }}
                  width={24}
                  height={24}
                />
              )}
            />
            <TouchableOpacity
              onPress={() => setIsModalVisible(true)}
              style={styles.customButton}
            >
              <View style={styles.buttonInnerContent}>
                <Text variant="labelLarge">
                  {currentBook} {currentChap}
                </Text>
                <ArrowDownIcon width={18} height={18} />
              </View>
            </TouchableOpacity>
            <IconButton
              icon={() => (
                <ArrowRightGreyIcon
                  style={{ margin: 8 }}
                  width={24}
                  height={24}
                />
              )}
              onPress={() => {
                setCurrentChap((prev) => {
                  if (prev < documentResult.data.document.cvIndexes.length) {
                    return prev + 1;
                  } else {
                    return prev;
                  }
                });
              }}
            />
          </>
        ) : (
          <ActivityIndicator />
        )}
      </View>
      {/* <TouchableOpacity
        style={{
          padding: 16,
          borderRadius: 16,
          backgroundColor: "rgba(224, 224, 249, 1)",
        }}
      >
        <LoopIcon width={24} height={24} />
      </TouchableOpacity> */}
    </View>
  );
}
