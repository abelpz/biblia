import React, {
  useState,
  useContext,
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import ArrowDownIcon from "../assets/icons/flavorIcons/arrowDown";
import ResourcesIcon from "../assets/icons/flavorIcons/resources";
import { TouchableRipple } from "react-native-paper";
import { ProskommaContext } from "../context/proskommaContext";
import { ColorThemeContext } from "../context/colorThemeContext";

export default function DropDownSelectRessources({ setDocSetId, docSetId,setIsOnTop }) {
  const [inComponentValue, setInComponentValue] = useState(null);
  const { pk } = useContext(ProskommaContext);
  const { colors, theme } = useContext(ColorThemeContext);

  const dropdownRef = useRef(null);
  const data = useRef(createDataArray(pk));
  useEffect(() => {
    setInComponentValue(data.current[0].value);
  }, [data]);

  useEffect(() => {
    if (inComponentValue) {
      setDocSetId(inComponentValue);
    }
  }, [inComponentValue]);

  const handleChange = (item) => {
    setIsOnTop(false)
    setInComponentValue(item.value);
  };

  const openDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.open();
    }
  };

  return (
    <View style={styles.dropdownWrapper}>
      <Dropdown
        ref={dropdownRef}
        style={[styles.dropdown]}
        itemTextStyle={{ color: colors.schemes[theme].onSurface }}
        placeholderStyle={[
          styles.placeholderStyle,
          {
            color: colors.schemes[theme].onSurface,
            backgroundColor: colors.schemes[theme].surface,
          },
        ]}
        itemContainerStyle={[
          styles.itemContainerStyle,
          {
            color: colors.schemes[theme].onSurface,
            backgroundColor: colors.schemes[theme].surface,
          },
        ]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          { color: colors.schemes[theme].onSurfaceVariant },
        ]}
        containerStyle={[
          styles.containerStyle,
          {
            backgroundColor: colors.schemes[theme].surface,
            color: colors.schemes[theme].onSurface,
          },
        ]}
        activeColor={colors.schemes[theme].surfaceVariant}
        selectedTextProps={{
          numberOfLines: 1,
          ellipsizeMode: "tail",
        }}
        data={data.current}
        labelField="label"
        valueField="value"
        value={inComponentValue}
        onChange={handleChange}
        showsVerticalScrollIndicator={true}
        renderLeftIcon={() => (
          <View style={{ marginLeft: 12 }}>
            <ResourcesIcon
              color={colors.schemes[theme].onSurface}
              width={18}
              height={18}
            />
          </View>
        )}
        renderRightIcon={() => (
          <View style={{ marginRight: 12 }}>
            <ArrowDownIcon
              color={colors.schemes[theme].onSurface}
              width={18}
              height={18}
            />
          </View>
        )}
      />
      <TouchableRipple
        onPress={openDropdown}
        style={styles.touchableOverlay}
        borderless
        rippleColor = {colors.stateLayers[theme].onSurfaceVariant.opacity012}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: "100%" }} />
        </View>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownWrapper: {
    position: "relative",
  },
  dropdown: {
    height: 32,
    width: Dimensions.get("window").width - 3 * 48 - 16, //-16 for 4*2 padding and 4*2 for 4 gap
    borderWidth: 1,
    borderRadius: 9,
    borderColor: "#777680",
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    flexDirection: "row",
  },
  placeholderStyle: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingVertical: 4,
    textAlign: "center",
  },
  selectedTextStyle: {
    fontSize: 16,
    marginHorizontal: 12,
    textAlign: "center",
  },
  containerStyle: {
    maxHeight: 600,
    minHeight: 300,
    borderRadius: 4,
    paddingBottom: 12,
  },
  itemContainerStyle: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  touchableOverlay: {
    ...StyleSheet.absoluteFillObject,
    height: 32,
    zIndex: 2,
    borderRadius: 9,
    backgroundColor: "rgba(0,0,0,0)",
    justifyContent: "center",
    alignItems: "center",
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
