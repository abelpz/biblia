import React, { useEffect, useState, useContext, useMemo, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ProskommaContext } from "../context/proskommaContext";
import { ReadingScreenAllBook } from "../components/renderer/textComponentRender/RenderText";
import { Button, Chip } from "react-native-paper";
import TopBarContainer from "../components/TopBarContainer";
import Ressources from "../assets/icons/flavorIcons/resources.svg"

import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";

export default function Test() {
  const snapPoints = useMemo(() => ["30%"], []);
  const { pk } = useContext(ProskommaContext);
  const bottomSheetRef = useRef(null);
  const [isOnTop, setIsOnTop] = useState(false);

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
    <GestureHandlerRootView style={styles.container}>
      <TopBarContainer>
        <Animated.View
          style={[
            {
              flex: 1,
              flexDirection: "row",
              gap: 4,
              paddingHorizontal: 4,
              paddingVertical: 8,
              alignItems: "center",
            },
            HeaderStyle,
          ]}
        >
          <Button>
            <Text>dsds</Text>
          </Button>
          <View style={styles.chipContainer}>
            <Chip 
            icon={<Ressources/>}
            compact={true} mode="outlined" >
              <Text style={styles.titleContainer}>Pain Sur Les Eaux</Text>
            </Chip>
          </View>
          <Button>
            <Text>dsds</Text>
          </Button>
          <Button>
            <Text>dsds</Text>
          </Button>
        </Animated.View>
      </TopBarContainer>

      <ReadingScreenAllBook
        setIsOnTop={setIsOnTop}
        livre={"TIT"}
        bible={"xenizo_psle_1"}
        pk={pk}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.containerHeadline}>Awesome Bottom Sheet 🎉</Text>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    height: 32,
    paddingVertical: 6,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  chipContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
