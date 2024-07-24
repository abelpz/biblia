import { TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import LoopIcon from "../../assets/icons/flavorIcons/loop";
export default function BottomSheetSearch() {
  const [text, setText] = useState("");

  return (
    <View style={styles.optionContentContainer}>
      <TextInput
        label="Trouver un mot"
        value={text}
        style={{backgroundColor:'rgba(234, 231, 239, 1)', borderTopLeftRadius:28,borderTopRightRadius:28,borderRadius:28}}
        onChangeText={(text) => setText(text)}
        right={
          <TextInput.Icon
          icon={() => <LoopIcon width={24} height={24} />} // where <Icon /> is any component from vector-icons or anything else
          />
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  optionContentContainer: {
    width: "100%",
    paddingHorizontal: 32,
    gap: 12,
  },
});
