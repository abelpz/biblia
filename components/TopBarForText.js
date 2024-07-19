import React, { useEffect, useState, useContext, useMemo, useRef } from "react";
import TopBarContainer from "./TopBarContainer";
import Animated from "react-native-reanimated";
import { Button } from "react-native-paper";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";

import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import ResourcesIcon from "../app/assets/icons/flavorIcons/resources";
import ArrowDownIcon from "../app/assets/icons/flavorIcons/arrowDown";
import ParamTextIcon from "../app/assets/icons/flavorIcons/paramText";
import AddResourcesIcon from "../app/assets/icons/flavorIcons/addResources";
import DropDownSelectRessources from "./DropDownSelectRessources";
import { ColorThemeContext } from "../context/colorThemeContext";

export default function TopBarForText({
  isOnTop,
  functionTitle,
  functionParamText,
  functionAddResources,
  setIsOnTop,
}) {
  const { colors, theme } = useContext(ColorThemeContext);
  const progress = useDerivedValue(() => {
    return isOnTop ? withTiming(1) : withTiming(0);
  }, [isOnTop]);

  const styles = StyleSheet.create({
    titleContainer: {
      paddingLeft: 8,
      paddingRight: 8,
      textAlign: "center",
    },

    customButton: {
      width: "50%",
      borderWidth: 1,
      borderRadius: 9,
      borderColor: colors.schemes[theme].outline,
      borderStyle: "solid",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      paddingVertical: 6,
      paddingHorizontal: 12,
    },

    buttonInnerContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
  });

  const HeaderStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.schemes[theme].surface, colors.schemes[theme].surfaceContainer]
    );
    return { backgroundColor };
  });

  return (
    <Animated.View style={[HeaderStyle]}>
      <TopBarContainer>
        <View
          style={{
            flexDirection: "row",
            gap: 4,
            height: 48,
            paddingHorizontal: 4,
            paddingVertical: 8,
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ height: 48, width: 48 }}></View>
          <View style={{}}>
            <DropDownSelectRessources setDocSetId={functionTitle} />
          </View>
          <View
            style={{
              height: 48,
              flexDirection: "row",
              margin: 0,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                height: 48,
                width: 48,
                margin: 0,
                padding: 0,
              }}
            >
              <IconButton
                style={{
                  margin: 0,
                  alignSelf: "center",
                  width: 48,
                  height: 48,
                }}
                onPress={() => functionParamText()}
                icon={() => <ParamTextIcon />}
              />
            </View>

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
                onPress={functionParamText}
                icon={() => <AddResourcesIcon/>}
              />
            </View>
          </View>
        </View>
      </TopBarContainer>
    </Animated.View>
  );
}
