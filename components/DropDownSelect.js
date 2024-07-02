import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  RessourcesIcon,
  ArrowDownIcon,
} from "../assets/icons/flavorIcons/icons";
import { Text } from "react-native-paper";
import { ProskommaContext } from "../context/proskommaContext";

export default function DropDownSelect() {
  const [value, setValue] = useState('xenizo_psle_1');
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState([]);
  const { pk } = useContext(ProskommaContext);

  useEffect(() => {
    async function fetchData() {
      const result = await createDataArray(pk);
      setData(result);
    }

    fetchData();
  }, [pk]);

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
        setValue(item.value);
        setIsFocus(false);
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

async function createDataArray(pk) {
  const response = await pk.gqlQuerySync(`
    {
      docSets {
        tags
        id
      }
    }
  `);

  return response.data.docSets.map((e) => ({ label: e.tags[0].split(":")[1], value: e.id }));
}
