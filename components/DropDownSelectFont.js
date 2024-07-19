import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import ResourcesIcon from "../app/assets/icons/flavorIcons/resources";
import ArrowDownIcon from "../app/assets/icons/flavorIcons/arrowDown";

import { Text } from "react-native-paper";
import { ProskommaContext } from "../context/proskommaContext";

export default function DropDownSelectFont({setFontFamily}) {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('Roboto');

  const [data, setData] = useState([
    { label: "Roboto", value: "Roboto" },
    { label: "Gentium", value: "Gentium" },
    {label:"Andika",value:'Andika'}
  ]);


  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
      placeholderStyle={styles.placeholderStyle}
      itemContainerStyle={styles.placeholderStyle}
      selectedTextStyle={styles.placeholderStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value)
        setFontFamily(item.value);
      }}
      renderRightIcon={() => <ArrowDownIcon width={18} height={18} />}
    />
  );
}

const styles = StyleSheet.create({

  dropdown: { 
    width: 150,
    height: 32,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: "#777680",
    borderStyle: "solid",
    justifyContent: "center",
    alignSelf:'center',
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal:16,
    paddingVertical: 6,
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
    textAlign: "center",
  },
  selectedTextStyle: {
    fontSize: 16,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

