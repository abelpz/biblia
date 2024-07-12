import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  RessourcesIcon,
  ArrowDownIcon,
} from "../assets/icons/flavorIcons/icons";
import { Text } from "react-native-paper";
import { ProskommaContext } from "../context/proskommaContext";

export default function DropDownSelectRessources({ setDocSetId, docSetId }) {
  const [isFocus, setIsFocus] = useState(false);
  const [inComponentValue, setInComponentValue] = useState(null);
  const { pk } = useContext(ProskommaContext);
  const data = useRef(createDataArray(pk));

  useLayoutEffect(() => {
    if (inComponentValue) {
      setDocSetId(inComponentValue);
    }
  }, [inComponentValue]);
  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
      placeholderStyle={styles.placeholderStyle}
      itemContainerStyle={styles.placeholderStysetDocSetIdle}
      selectedTextStyle={styles.placeholderStyle}
      data={data.current}
      labelField="label"
      valueField="value"
      value={data.current[0]}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setIsFocus(false);
        setInComponentValue(item.value);
      }}
      renderLeftIcon={() => <RessourcesIcon width={18} height={18} />}
      renderRightIcon={() => <ArrowDownIcon width={18} height={18} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 32,
    minWidth: 200,
    alignSelf: "stretch",
    borderWidth: 1,
    borderRadius: 9,
    borderColor: "#777680",
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingVertical: 4,
    wrap: "nowrap",

    ellipsizeMode: "head",
    numberOfLines: 1,
  },
  selectedTextStyle: {
    fontSize: 16,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
function createDataArray(pk) {
  const response = pk.gqlQuerySync(`
    {
      docSets {
        tags
        id
      }
    }
  `);

  return response.data.docSets.map((e) => ({
    label: e.tags[0].split(":")[1],
    value: e.id,
  }));
}
