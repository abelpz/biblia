import React, { useEffect, useState, useContext, useMemo, useRef } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ProskommaContext } from "../context/proskommaContext";
import { ReadingScreenAllBook } from "../components/renderer/textComponentRender/RenderText";
import TopBarForText from "../components/TopBarForText";

export default function Test() {
  const snapPoints = useMemo(() => ["30%"], []);
  const { pk } = useContext(ProskommaContext);
  const bottomSheetRef = useRef(null);
  const [isOnTop, setIsOnTop] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  console.log(isBottomSheetOpen)
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
          style={styles.overlay}
          onPress={() => {
            setIsBottomSheetOpen(false)
            bottomSheetRef.current.close()}}
        >
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={()=>setIsBottomSheetOpen(false)}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.containerHeadline}>Awesome Bottom Sheet 🎉</Text>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "red",
    height:"70%",
    width:'100%',
    left:0,
    top: 0,    opacity:0,

  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
