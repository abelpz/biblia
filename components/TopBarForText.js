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
import DropDownSelect from "./DropDownSelect";

export default function TopBarForText({
  isOnTop,
  functionTitle,
  functionParamText,
  functionAddResources,
  setIsOnTop,
}) {
  const progress = useDerivedValue(() => {
    return isOnTop ? withTiming(1) : withTiming(0);
  }, [isOnTop]);

  const HeaderStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ["white", "red"]
    );
    return { backgroundColor };
  });

  return (
    <Animated.View style={[{ height: "12%" }, HeaderStyle]}>
      <TopBarContainer>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            gap: 4,
            paddingHorizontal: 4,
            paddingVertical: 8,
            alignItems: "center",
          }}
        >
          <Button style={{ width: "20%" }}>
            <View style={{ width: 24, height: 24 }} />
          </Button>

          <DropDownSelect/>
          <View style={{ flexDirection: "row", width: "20%" }}>
            <IconButton
              style={{ margin: 8 }}
              onPress={() => functionParamText}
              icon={() => <ParamTextIcon width={24} height={24} />}
              size={24}
            />
           <IconButton
              style={{ margin: 8 }}
              onPress={functionParamText}
              icon={() => <AddRessourcesIcon width={24} height={24} />}
              size={24}

            />
          </View>
        </View>
      </TopBarContainer>
    </Animated.View>
  );
}

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
    borderColor: "#777680",
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
