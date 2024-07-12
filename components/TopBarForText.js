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
import {
  RessourcesIcon,
  ArrowDownIcon,
  AddRessourcesIcon,
  ParamTextIcon,
} from "../assets/icons/flavorIcons/icons";
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
            width: "50%",
            flexDirection: "row",
            gap: 4,
            height: 48,
            paddingHorizontal: 4,
            paddingVertical: 8,
            alignItems: "center",
          }}
        >
          <View style={{ height: 48, width: 48 }}></View>

          <DropDownSelectRessources setDocSetId={functionTitle} />
          <View
            style={{
              flexDirection: "row",
              gap: 0,
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 48,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                size={48}
                style={{margin:0}}
                onPress={() => functionParamText()}
                icon={() => <ParamTextIcon/>}
              />
            </View>

            {/* <View style={{ height: 48, width: 48 }}></View> */}
            <View
              style={{
                height: 48,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
              style={{ margin: 0 }}
              onPress={functionParamText}
              icon={() => <AddRessourcesIcon/>}
              size={48}
            />
            </View>
          
          </View>
        </View>
      </TopBarContainer>
    </Animated.View>
  );
}
