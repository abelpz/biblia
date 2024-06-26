import React, { useEffect, useState, useContext, useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import BottomSheet, { BottomSheetHandle } from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

import { ProskommaContext } from "../context/proskommaContext";
import { ReadingScreenAllBook } from "../components/renderer/textComponentRender/RenderText";
import TopBarForText from "../components/TopBarForText";
import { Slider, HapticModeEnum } from "react-native-awesome-slider";
import { Text } from "react-native-paper";
export default function Test() {
  const progress = useSharedValue(12);
  const min = useSharedValue(12);
  const max = useSharedValue(28);
  const snapPoints = useMemo(() => ["30%"], []);
  const { pk } = useContext(ProskommaContext);
  const bottomSheetRef = useRef(null);
  const [isOnTop, setIsOnTop] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const image = require("../assets/icons/flavorIcons/Handle.png");

  const renderStepMarker = ({ stepMarked }) => (
    <View style={styles.stepMarker} />
  );

  useEffect(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <TopBarForText
        isOnTop={isOnTop}
        functionParamText={() => {
          setIsBottomSheetOpen(true);
          bottomSheetRef.current.snapToIndex(0);
        }}
      />
      <ReadingScreenAllBook
        setIsOnTop={setIsOnTop}
        livre={"TIT"}
        bible={"xenizo_psle_1"}
        pk={pk}
      />
      {isBottomSheetOpen && (
        <TouchableWithoutFeedback
          onPress={() => {
            setIsBottomSheetOpen(false);
            bottomSheetRef.current.close();
          }}
        >
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableContentPanningGesture={false}
        onClose={() => setIsBottomSheetOpen(false)}
        enableHandlePanningGesture={true} // Disable content gestures
      >
        <View style={styles.contentContainer}>
          <View style={styles.optionContainer}>
            <Text varriant="bodyLarge">Taille</Text>
            <Slider
              theme={{
                maximumTrackTintColor: "#rgba(223, 224, 255, 1)",
                minimumTrackTintColor: "#rgba(223, 224, 255, 1)",
              }}
              renderThumb={() => (
                <View
                  style={{
                    backgroundColor: "white",
                    height: 32,
                    width: 20,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(84, 90, 146, 1)",
                      borderRadius: 3,
                      height: 32,
                      width: 4,
                      justifyContent: "center",
                    }}
                  />
                </View>
              )}
              progress={progress}
              minimumValue={min}
              maximumValue={max}
              step={4}
              containerStyle={{
                backgroundColor: "rgba(223, 224, 255, 1)",
                height: 16,
                borderRadius: 24,
              }}
              thumbWidth={12}
              onHapticFeedback={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              }}
              hapticMode={HapticModeEnum.STEP}
            />
          </View>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    left: 0,
    top: 0,
    opacity: 0,
  },
  container: {
    flex: 1,
  },
  optionContentContainer: {
    width: "100%",
    alignItems: "center",
  },
  optionContainer: {
    gap: 12,
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 50,
    marginHorizontal: 20,
  },
  stepMarker: {
    width: 4,
    height: 4,
    borderRadius: 30,

    marginTop: 7,
    backgroundColor: "rgba(84, 90, 146, 1)",
  },
});
