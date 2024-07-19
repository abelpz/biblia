const renderStyles = {
  paras: {
    default: {
      fontSize: "medium",
      marginTop: 0.5,
      marginBottom: 0.5,
    },
    "usfm:b": {
      height: "1em",
    },
    "usfm:d": {
      fontStyle: "italic",
    },
    "usfm:f": {
      fontSize: "small",
    },
    "usfm:hangingGraft": {},
    "usfm:imt": {
      fontWeight: "bold",
      fontStyle: "italic",
      fontSize: "xx-large",
      textAlign: "center",
    },
    "usfm:imt2": {
      fontWeight: "bold",
      fontStyle: "italic",
      fontSize: "x-large",
      textAlign: "center",
    },
    "usfm:imt3": {
      fontWeight: "bold",
      fontStyle: "italic",
      fontSize: "large",
      textAlign: "center",
    },
    "usfm:ip": {
      textIndent: "1.5em",
    },
    "usfm:ipi": {
      paddingLeft: "1.5em",
      textIndent: "1.5em",
    },
    "usfm:io": {
      paddingLeft: "1.5em",
    },

    "usfm:iot": {
      fontWeight: "bold",
      fontSize: "large",
    },
    "usfm:is": {
      fontStyle: "italic",
      fontSize: "xx-large",
    },
    "usfm:is2": {
      fontStyle: "italic",
      fontSize: "x-large",
    },
    "usfm:is3": {
      fontStyle: "italic",
      fontSize: "large",
    },
    "usfm:li": {
      listStyleType: "disc",
      paddingLeft: "3em",
      textIndent: "-1.5em",
    },
    "usfm:li2": {
      listStyleType: "disc",
      paddingLeft: "4.5em",
      textIndent: "-1.5em",
    },
    "usfm:li3": {
      listStyleType: "disc",
      paddingLeft: "6em",
      textIndent: "-1.5em",
    },
    "usfm:m": {},
    "usfm:mi": {
      paddingLeft: "1.5em",
    },
    "usfm:mr": {
      fontSize: "large",
      fontStyle: "italic",
    },
    "usfm:ms": {
      fontSize: "large",
      fontWeight: "bold",
    },
    "usfm:ms2": {
      fontWeight: "bold",
    },
    "usfm:mt": {
      fontWeight: "bold",
      fontStyle: "italic",
      fontSize: "xx-large",
      textAlign: "center",
    },
    "usfm:mt2": {
      fontWeight: "bold",
      fontStyle: "italic",
      fontSize: "x-large",
      textAlign: "center",
    },
    "usfm:mt3": {
      fontWeight: "bold",
      fontStyle: "italic",
      fontSize: "large",
      textAlign: "center",
    },
    "usfm:nb": {},
    "usfm:p": {
      textIndent: "1.5em",
    },
    "usfm:pc": {
      textAlign: "center",
    },
    "usfm:pi": {
      paddingLeft: "1.5em",
      textIndent: "1.5em",
    },
    "usfm:pi2": {
      paddingLeft: "3em",
      textIndent: "1.5em",
    },
    "usfm:pi3": {
      paddingLeft: "4.5em",
      textIndent: "1.5em",
    },
    "usfm:q": {
      paddingLeft: "1.5em",
      marginTop: "0.5ex",
      marginBottom: "0.5ex",
    },
    "usfm:q2": {
      paddingLeft: "3em",
      marginTop: "0.5ex",
      marginBottom: "0.5ex",
    },
    "usfm:q3": {
      paddingLeft: "4.5em",
      marginTop: "0.5ex",
      marginBottom: "0.5ex",
    },
    "usfm:q4": {
      paddingLeft: "6em",
      marginTop: "0.5ex",
      marginBottom: "0.5ex",
    },
    "usfm:qa": {
      fontWeight: "bold",
      fontSize: "x-large",
    },
    "usfm:qr": {
      textAlign: "right",
    },
    "usfm:r": {
      fontWeight: "bold",
    },
    "usfm:s": {
      fontStyle: "italic",
      fontSize: "xx-large",
    },
    "usfm:s2": {
      fontStyle: "italic",
      fontSize: "x-large",
    },
    "usfm:s3": {
      fontStyle: "italic",
      fontSize: "large",
    },
    "usfm:s4": {},
    "usfm:s5": {},
    "usfm:sr": {
      fontSize: "large",
    },
    "usfm:tr": {},
    "usfm:x": {
      fontSize: "small",
    },
    "usfm:ib": {},
  },
  marks: {
    default: {},
    chapter_label: {
      fontSize: "xx-large",
      marginRight: "0.5em",
    },
    verses_label: {
      fontWeight: "bold",
      fontSize: "medium",
      marginRight: "0.5em",
    },
  },
  wrappers: {
    default: {},
    "usfm:add": {
      fontStyle: "italic",
    },
    "usfm:ior": {},

    "usfm:bd": {
      fontWeight: "bold",
    },
    "usfm:bdit": {
      fontWeight: "bold",
      fontStyle: "italic",
    },
    "usfm:bk": {
      fontWeight: "bold",
    },

    chapter: {},
    "usfm:fl": {},
    "usfm:fm": {},
    "usfm:fq": {
      fontStyle: "italic",
    },
    "usfm:fqa": {
      fontStyle: "italic",
    },
    "usfm:fr": {
      fontWeight: "bold",
    },
    "usfm:ft": {},
    "usfm:it": {
      fontStyle: "italic",
    },
    "usfm:nd": {
      fontWeight: "bold",
      fontSize: "smaller",
      textTransform: "uppercase",
    },
    "usfm:qs": {
      float: "right",
      fontStyle: "italic",
    },
    "usfm:sc": {
      fontSize: "smaller",
      textTransform: "uppercase",
    },
    "usfm:tl": {
      fontStyle: "italic",
    },
    verses: {},
    "usfm:wj": {
      color: "#D00",
    },
    "usfm:xk": {},
    "usfm:xo": {
      fontWeight: "bold",
    },
    "usfm:xt": {},
  },
};

export { renderStyles, ConvertCssToReactNativeStyleOnFloor };

function ConvertCssToReactNativeStyleOnFloor(
  styleSheet,
  index,
  fontFamily = null
) {
  const multiTab = [0.75, 0.88, 1, 1.15, 1.25];
  const fontSpace = [0.1, 0.25, 0.5, 0.14, 0, 0, 0];
  const fontSizeTab = [14, 14, 16, 16, 22, 24, 36];
  const lineHeightTab = [20, 20, 24, 24, 28, 32, 44];

  //  note that this function is not exaustive and need futher adding. Unfortunatly not all css
  //is compatible with react native so be sure to check the documentation when adding css
  let copyStyleSheet = { ...styleSheet };

  const thirdLayerKeysArray = Object.keys(copyStyleSheet);

  let font = `${fontFamily}`;
  let values = Object.values(copyStyleSheet);
  if (values.includes("bold") && values.includes("italic")) {
    // font = font + "-BoldItalic";
    // copyStyleSheet["fontFamily"] = font;
    delete copyStyleSheet["fontWeight"];
    delete copyStyleSheet["fontStyle"];
  } else if (values.includes("bold")) {
    // font = font + "-Bold";
    // copyStyleSheet["fontFamily"] = font;
    delete copyStyleSheet["fontWeight"];
  } else if (values.includes("italic")) {
    // font = font + "-Bold";
    // copyStyleSheet["fontFamily"] = font;
    delete copyStyleSheet["fontStyle"];
  }

  thirdLayerKeysArray.map((thirdLayerKey) => {
    if (thirdLayerKey === "float") {
      if (copyStyleSheet[thirdLayerKey] === "left") {
        copyStyleSheet["textAlign"] = "left";
        delete copyStyleSheet[thirdLayerKey];
      }
    }

    if (thirdLayerKey === "verticalAlign") {
      if (copyStyleSheet[thirdLayerKey] === "super") {
        copyStyleSheet[thirdLayerKey] = "top";
      }
    }
    if (thirdLayerKey === "textIndent") {
      if (copyStyleSheet[thirdLayerKey].includes("em")) {
        let stringToChange = copyStyleSheet[thirdLayerKey];
        stringToChange.replace("em", "");
        copyStyleSheet["marginLeft"] = parseFloat(stringToChange) * 16;
        delete copyStyleSheet[thirdLayerKey];
      }
      delete copyStyleSheet[thirdLayerKey];
    }

    if (copyStyleSheet[thirdLayerKey] === "xx-small") {
      copyStyleSheet[thirdLayerKey] = fontSizeTab[0] * multiTab[index]
      copyStyleSheet["lineHeight"] = lineHeightTab[0]  * multiTab[index]
      copyStyleSheet["letterSpacing"] = fontSpace[0];
      if (fontFamily) {
        copyStyleSheet["fontFamily"] = `${fontFamily}-Medium`;
      }
    }
    if (copyStyleSheet[thirdLayerKey] === "x-small") {
      copyStyleSheet[thirdLayerKey] = fontSizeTab[1]  * multiTab[index]
      copyStyleSheet["lineHeight"] = lineHeightTab[1]  * multiTab[index]
      copyStyleSheet["letterSpacing"] = fontSpace[1];
      if (fontFamily) {
        copyStyleSheet["fontFamily"] = `${fontFamily}-Regular`;
      }
    }
    if (copyStyleSheet[thirdLayerKey] === "small") {
      copyStyleSheet[thirdLayerKey] = fontSizeTab[2]  * multiTab[index]
      copyStyleSheet["lineHeight"] = lineHeightTab[2]  * multiTab[index]
      copyStyleSheet["letterSpacing"] = fontSpace[2];
      if (fontFamily) {
        copyStyleSheet["fontFamily"] = `${fontFamily}-Regular`;
      }
    }
    if (copyStyleSheet[thirdLayerKey] === "medium") {
      copyStyleSheet[thirdLayerKey] = fontSizeTab[3]  * multiTab[index]
      copyStyleSheet["lineHeight"] = lineHeightTab[3]  * multiTab[index]
      copyStyleSheet["letterSpacing"] = fontSpace[3];
      if (fontFamily) {
        copyStyleSheet["fontFamily"] = `${fontFamily}-Medium`;
      }
    }
    if (copyStyleSheet[thirdLayerKey] === "large") {
      copyStyleSheet[thirdLayerKey] = fontSizeTab[4]  * multiTab[index]
      copyStyleSheet["lineHeight"] = lineHeightTab[4]  * multiTab[index]
      copyStyleSheet["letterSpacing"] = fontSpace[4];
      if (fontFamily) {
        copyStyleSheet["fontFamily"] = `${fontFamily}-Regular`;
      }
    }
    if (copyStyleSheet[thirdLayerKey] === "x-large") {
      copyStyleSheet[thirdLayerKey] = fontSizeTab[5]  * multiTab[index]
      copyStyleSheet["lineHeight"] = lineHeightTab[5]  * multiTab[index]
      copyStyleSheet["letterSpacing"] = fontSpace[5];
      if (fontFamily) {
        copyStyleSheet["fontFamily"] = `${fontFamily}-Regular`;
      }
    }
    if (copyStyleSheet[thirdLayerKey] === "xx-large") {
      copyStyleSheet[thirdLayerKey] = fontSizeTab[6]  * multiTab[index]
      copyStyleSheet["lineHeight"] = lineHeightTab[6]  * multiTab[index]
      copyStyleSheet["letterSpacing"] = fontSpace[6];
      if (fontFamily) {
        copyStyleSheet["fontFamily"] = `${fontFamily}-Regular`;
      }
    }
    if (typeof copyStyleSheet[thirdLayerKey] === typeof "string") {
      if (copyStyleSheet[thirdLayerKey].includes("em")) {
        let stringToChange = copyStyleSheet[thirdLayerKey];
        stringToChange.replace("em", "");
        copyStyleSheet[thirdLayerKey] =
          parseFloat(stringToChange) * fontSizeTab[3];
        return;
      }
      if (copyStyleSheet[thirdLayerKey].includes("ex")) {
        let stringToChange = copyStyleSheet[thirdLayerKey];
        stringToChange.replace("ex", "");
        copyStyleSheet[thirdLayerKey] = parseFloat(stringToChange);
        return;
      }
    }
  });

  return copyStyleSheet;
}
