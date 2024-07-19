import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
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
import { Button } from "react-native-paper";
import { ColorThemeContext } from "../context/colorThemeContext";
const Test = () => {
  const snapPoints = useMemo(() => [316], []);
  const { pk } = useContext(ProskommaContext);
  const { colors, theme } = useContext(ColorThemeContext);

  const bottomSheetRef = useRef(null);
  const [isOnTop, setIsOnTop] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentChap, setCurrentChap] = useState(1);
  const [maxChap, setMaxChap] = useState(1);
  const [fontSize, setFontSize] = useState(2);
  const [documentResult, setDocResults] = useState(null);
  const [currentBook, setCurrentBook] = useState("PHP");
  const [fontFamily, setFontFamily] = useState("NotoSans");
  const [bibleFormat, setBibleFormat] = useState("format");
  const [docSetId, setDocSetId] = useState("xenizo_psle_1");

  useLayoutEffect(() => {
    setDocResults(null);
  }, [currentBook, docSetId]);

  useLayoutEffect(() => {
    if (!documentResult) {
      const fetchDocument = async () => {
        const result = await useDocumentQuery(currentBook, docSetId, pk);
        setMaxChap(
          result.data.document.cvIndexes[
            result.data.document.cvIndexes.length - 1
          ].chapter
        );
        setDocResults(result);
      };
      fetchDocument();
    }
  }, [documentResult]);

  const handleBottomSheetOpen = useCallback(() => {
    setIsBottomSheetOpen(true);
    bottomSheetRef.current.snapToIndex(0);
  }, []);

  const handleBottomSheetClose = useCallback(() => {
    setIsBottomSheetOpen(false);
    bottomSheetRef.current.close();
  }, []);

  const handleModalTextNavigation = useCallback((book, chap, verse) => {
    setCurrentBook(book);
    setCurrentChap(chap);
  }, []);

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
      marginHorizontal: 0,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
    },
    handlerStyleContainer: {
      padding: 16,
      margin: 12,
      height: 4,
    },
    handlerStyle: {
      backgroundColor: colors.schemes[theme].outline,
    },
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <TopBarForText
        isOnTop={isOnTop}
        functionTitle={setDocSetId}
        functionParamText={handleBottomSheetOpen}
      />
      <PaperProvider>
        <ReadingScreenAllBook
          setIsOnTop={setIsOnTop}
          documentResult={documentResult}
          pk={pk}
          fontSize={fontSize}
          currentChap={currentChap}
          fontFamily={fontFamily}
          bibleFormat={bibleFormat}
        />
        <ModalTextNavigation
          setbookNav={handleModalTextNavigation}
          currentBook={currentBook}
          setVisible={setIsModalVisible}
          visible={isModalVisible}
          docSetId={docSetId}
        />
      </PaperProvider>
      <BottomBar
        currentBook={currentBook}
        currentChap={currentChap}
        maxChap={maxChap}
        documentResult={documentResult}
        setCurrentChap={setCurrentChap}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      {isBottomSheetOpen && (
        <TouchableWithoutFeedback onPress={handleBottomSheetClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableContentPanningGesture={false}
        onClose={handleBottomSheetClose}
        enableHandlePanningGesture={true}
        handleStyle={styles.handlerStyleContainer}
        handleIndicatorStyle={styles.handlerStyle}
        backgroundStyle={styles.bottomSheet}
      >
        <BottomSheetContent
          setFontFamily={setFontFamily}
          setFontSize={setFontSize}
          setBibleFormat={setBibleFormat}
          bibleFormat={bibleFormat}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default React.memo(Test);
