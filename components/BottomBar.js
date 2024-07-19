import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton, Text, ActivityIndicator } from "react-native-paper";
import ArrowDownIcon from "../app/assets/icons/flavorIcons/arrowDown";
import ArrowUpIcon from "../app/assets/icons/flavorIcons/arrowUp";
import ArrowRightGreyIcon from "../app/assets/icons/flavorIcons/ArrowRightGreyIcon";
import ArrowLeftGreyIcon from "../app/assets/icons/flavorIcons/arrowGreyLeft";
import { useContext } from "react";
import { ColorThemeContext } from "../context/colorThemeContext";
import { TouchableRipple } from "react-native-paper";
export default function BottomBar({
  currentBook,
  setCurrentChap,
  currentChap,
  maxChap,
  documentResult,
  isModalVisible,
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
      overflow: "hidden",
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
            <View
              style={{
                height: 48,
                width: 48,
                padding: 0,
                margin: 0,
                justifyContent: "center",
              }}
            >
              <IconButton
                style={{
                  alignSelf: "center",
                  width: 48,
                  height: 48,
                  margin: 0,
                }}
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
                    color={currentChap === 1 ? "grey" : "black"}
                    width={18}
                    height={18}
                  />
                )}
              />
            </View>

            <TouchableRipple
              onPress={() => setIsModalVisible((prev) => !prev)}
              style={{
                borderRadius: 9,
                margin: 0,
                padding: 0,
                alignSelf: "center",
              }}
              borderless
              rippleColor="rgba(0, 0, 0, .32)"
            >
              <View style={styles.customButton}>
                <View style={styles.buttonInnerContent}>
                <Text variant="labelLarge">
                  {currentBook} {currentChap}
                </Text>
                {isModalVisible ? (
                  <ArrowUpIcon width={18} height={18} />
                ) : (
                  <ArrowDownIcon width={18} height={18} />
                )}
              </View>
                </View>
              
            </TouchableRipple>
            <View
              style={{
                height: 48,
                width: 48,
                padding: 0,
                margin: 0,
                justifyContent: "center",
              }}
            >
              <IconButton
                style={{
                  alignSelf: "center",
                  width: 48,
                  height: 48,
                  margin: 0,
                }}
                icon={() => (
                  <ArrowRightGreyIcon
                    color={currentChap === maxChap ? "grey" : "black"}
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
            </View>
          </>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </View>
  );
}
