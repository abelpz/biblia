import { StyleSheet } from "react-native";
import { View, TouchableOpacity } from "react-native";
import {
  ArrowLeftGreyIcon,
  ArrowRightGreyIcon,
  ArrowDownIcon,
  LoopIcon,
} from "../assets/icons/flavorIcons/icons";
import { useRef } from "react";
import { Text } from "react-native-paper";
export default function BottomBar({currentBook, setCurrentChap, currentChap,documentResult,setIsModalVisible }) {

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.InsideOfTheBottomBar}>
        <TouchableOpacity
          onPress={() => {
            setCurrentChap((prev) => {
              if (prev >= 2) {
                return prev - 1;
              } else {
                return prev;
              }
            });
          }}
        >
          <ArrowLeftGreyIcon style={{ margin: 8 }} width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
         style={styles.customButton}>
          <View style={styles.buttonInnerContent}>
            <Text variant="labelLarge">{currentBook} {currentChap}</Text>
            <ArrowDownIcon width={18} height={18} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCurrentChap((prev) => {
              if (prev < documentResult.data.document.cvIndexes.length) {
                return prev + 1;
              } else {
                return prev;
              }
            });
          }}
        >
          <ArrowRightGreyIcon style={{ margin: 8 }} width={24} height={24} />
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  bottomContainer: {
    height: "10%",
    width: "100%",
    backgroundColor: "rgba(239, 237, 244, 1)",
    alignItems: "center", // Center items horizontally
    flexDirection: "row",
    padding: 24,
    justifyContent: "space-between", // Center items vertically
  },
  customButton: {
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
    paddingLeft: 16,
    paddingVertical: 6,
    paddingRight: 8,
    gap: 6,
  },
  InsideOfTheBottomBar: { gap: 8, flexDirection: "row" },
});
