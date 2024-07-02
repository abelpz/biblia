import React, { useEffect, useState, useContext, useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ProskommaContext } from "../context/proskommaContext";
import { ReadingScreenAllBook } from "../components/renderer/textComponentRender/RenderText";
import TopBarForText from "../components/TopBarForText";
import { useDocumentQuery } from "../components/renderer/textComponentRender/RenderText";
import BottomSheetContent from "../components/BottomSheets/BottomSheetContent";

import { Text, PaperProvider } from "react-native-paper";
import BottomSheetSearch from "../components/BottomSheets/BottomSheetSearch";
import BottomBar from "../components/BottomBar";
import ModalTextNavigation from "../components/ModalDocNav/ModalTextNavigation";
export default function Test() {
  const snapPoints = useMemo(() => ["30%"], []);
  const { pk } = useContext(ProskommaContext);
  const bottomSheetRef = useRef(null);
  const [isOnTop, setIsOnTop] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentChap, setCurrentChap] = useState(1);
  const [fontSize, setFontSize] = useState("headlineSmall");
  const [documentResult, setDocResults] = useState(null);

  useEffect(() => {
    async function fetchDocument() {
      const result = await useDocumentQuery("TIT", "xenizo_psle_1", pk);
      setDocResults(result);
    }
    fetchDocument();
  }, [currentChap, fontSize]);

  useEffect(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider>
        <TopBarForText
          isOnTop={isOnTop}
          functionParamText={() => {
            setIsBottomSheetOpen(true);
            bottomSheetRef.current.snapToIndex(0);
          }}
        />
        <ReadingScreenAllBook
          setIsOnTop={setIsOnTop}
          documentResult={documentResult}
          pk={pk}
          fontSize={fontSize}
          currentChap={currentChap}
        />

        <ModalTextNavigation
          setVisible={setIsModalVisible}
          visible={isModalVisible}
          documentResult={documentResult}
        />
      </PaperProvider>

      <BottomBar
        currentChap={currentChap}
        documentResult={documentResult}
        setCurrentChap={setCurrentChap}
        setIsModalVisible={setIsModalVisible}
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
        enableHandlePanningGesture={true}
        backgroundStyle={styles.bottomSheet} // Added style for BottomSheet
      >
        <BottomSheetSearch />
        {/* <BottomSheetContent setFontSize={setFontSize} /> */}
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
  bottomSheet: {
    marginHorizontal: 16,
  },
});
