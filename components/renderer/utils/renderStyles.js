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
      fontSize:"medium",
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

function ConvertCssToReactNativeStyle(styleSheet, index) {
  const fontSizeTab = [
    [11, 12, 14, 16, 22, 24, 28],
    [12, 14, 16, 22, 24, 28, 32],
    [14, 16, 22, 24, 28, 32, 36],
    [16, 22, 24, 28, 32, 36, 45],
    [22, 24, 28, 32, 36, 45, 57],
  ];

  const lineHeightTab = [
    [16, 16, 20, 24, 28, 32, 36],
    [16, 20, 24, 28, 32, 36, 40],
    [20, 24, 28, 32, 36, 40, 44],
    [24, 28, 32, 36, 40, 44, 52],
    [28, 32, 36, 40, 44, 52, 64],
  ];

  //  note that this function is not exaustive and need futher adding. Unfortunatly not all css
  //is compatible with react native so be sure to check the documentation when adding css
  let copyStyleSheet = styleSheet;
  const keyFirstLayerArray = Object.keys(copyStyleSheet);
  keyFirstLayerArray.map((firstLayerKeys) => {
    const secondLayerKeysArray = Object.keys(copyStyleSheet[firstLayerKeys]);
    secondLayerKeysArray.map((secondLayerKey) => {
      const thirdLayerKeysArray = Object.keys(
        copyStyleSheet[firstLayerKeys][secondLayerKey]
      );
      thirdLayerKeysArray.map((thirdLayerKey) => {
        if (thirdLayerKey === "float") {
          if (
            copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] ===
            "left"
          ) {
            copyStyleSheet[firstLayerKeys][secondLayerKey]["textAlign"] =
              "left";
            delete copyStyleSheet[firstLayerKeys][secondLayerKey][
              thirdLayerKey
            ];
          }
        }
        if (thirdLayerKey === "verticalAlign") {
          if (
            copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] ===
            "super"
          ) {
            copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] =
              "top";
          }
        }
        if (thirdLayerKey === "textIndent") {
          if (
            copyStyleSheet[firstLayerKeys][secondLayerKey][
              thirdLayerKey
            ].includes("em")
          ) {
            let stringToChange =
              copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey];
            stringToChange.replace("em", "");
            copyStyleSheet[firstLayerKeys][secondLayerKey]["marginLeft"] =
              parseFloat(stringToChange) * 16;
            delete copyStyleSheet[firstLayerKeys][secondLayerKey][
              thirdLayerKey
            ];
          }
          delete copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey];
        }
        if (
          copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] ===
          "medium"
        ) {
          copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] =
            fontSizeTab[index][3];
          copyStyleSheet[firstLayerKeys][secondLayerKey]["lineHeight"] =
            lineHeightTab[index][3];
        }
        if (
          copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] ===
          "x-small"
        ) {
          copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] =
            fontSizeTab[index][1];
          copyStyleSheet[firstLayerKeys][secondLayerKey]["lineHeight"] =
            lineHeightTab[index][1];
        }
        if (
          copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] ===
          "xx-small"
        ) {
          copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] =
            fontSizeTab[index][0];
          copyStyleSheet[firstLayerKeys][secondLayerKey]["lineHeight"] =
            lineHeightTab[index][0];
        }
        if (
          copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] ===
          "small"
        ) {
          copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] =
            fontSizeTab[index][2];
          copyStyleSheet[firstLayerKeys][secondLayerKey]["lineHeight"] =
            lineHeightTab[index][2];
        }
        if (
          copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] ===
          "large"
        ) {
          copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] =
            fontSizeTab[index][4];
          copyStyleSheet[firstLayerKeys][secondLayerKey]["lineHeight"] =
            lineHeightTab[index][4];
        }
        if (
          copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] ===
          "x-large"
        ) {
          copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] =
            fontSizeTab[index][5];
          copyStyleSheet[firstLayerKeys][secondLayerKey]["lineHeight"] =
            lineHeightTab[index][5];
        }
        if (
          copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] ===
          "xx-large"
        ) {
          copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] =
            fontSizeTab[index][6];
          copyStyleSheet[firstLayerKeys][secondLayerKey]["lineHeight"] =
            lineHeightTab[index][6];
        }
        if (
          typeof copyStyleSheet[firstLayerKeys][secondLayerKey][
            thirdLayerKey
          ] === typeof "string"
        ) {
          if (
            copyStyleSheet[firstLayerKeys][secondLayerKey][
              thirdLayerKey
            ].includes("em")
          ) {
            let stringToChange =
              copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey];
            stringToChange.replace("em", "");
            copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] =
              parseFloat(stringToChange) * fontSizeTab[index][3];
            return;
          }
          if (
            copyStyleSheet[firstLayerKeys][secondLayerKey][
              thirdLayerKey
            ].includes("ex")
          ) {
            let stringToChange =
              copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey];
            stringToChange.replace("ex", "");
            copyStyleSheet[firstLayerKeys][secondLayerKey][thirdLayerKey] =
              parseFloat(stringToChange);
            return;
          }
        }
      });
    });
  });
  return copyStyleSheet;
}

export { renderStyles,ConvertCssToReactNativeStyleOnFloor };

function ConvertCssToReactNativeStyleOnFloor(styleSheet, index,fontFamily=null) {
  const fontSizeTab = [
    [11, 12, 14, 16, 22, 24, 28],
    [12, 14, 16, 22, 24, 28, 32],
    [14, 16, 22, 24, 28, 32, 36],
    [16, 22, 24, 28, 32, 36, 45],
    [22, 24, 28, 32, 36, 45, 57],
  ];

  const lineHeightTab = [
    [16, 16, 20, 24, 28, 32, 36],
    [16, 20, 24, 28, 32, 36, 40],
    [20, 24, 28, 32, 36, 40, 44],
    [24, 28, 32, 36, 40, 44, 52],
    [28, 32, 36, 40, 44, 52, 64],
  ];

  //  note that this function is not exaustive and need futher adding. Unfortunatly not all css
  //is compatible with react native so be sure to check the documentation when adding css
  let copyStyleSheet = {...styleSheet};

  const thirdLayerKeysArray = Object.keys(copyStyleSheet);
  if(fontFamily){
    let font = `${fontFamily}`
    let values = Object.values(copyStyleSheet)
    if(values.includes('bold') && values.includes('italic')){
        console.log(copyStyleSheet)
        font = font+"-BoldItalic"
        copyStyleSheet['fontFamily'] = font
        delete copyStyleSheet['fontWeight']
        delete copyStyleSheet['fontStyle']
        
        
    }
    else if(values.includes('bold')){
        font = font+"-Bold"
        copyStyleSheet['fontFamily'] = font
        delete copyStyleSheet['fontWeight']
    }
    else if(values.includes('italic')){
        font = font+"-Bold"
        copyStyleSheet['fontFamily'] = font
        delete copyStyleSheet['fontStyle']
    }
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
   
  
    if (copyStyleSheet[thirdLayerKey] === "medium") {
      copyStyleSheet[thirdLayerKey] = fontSizeTab[index][3];
      copyStyleSheet["lineHeight"] = lineHeightTab[index][3];
    }
    if (copyStyleSheet[thirdLayerKey] === "x-small") {
      copyStyleSheet[thirdLayerKey] = fontSizeTab[index][1];
      copyStyleSheet["lineHeight"] = lineHeightTab[index][1];
    }
    if (copyStyleSheet[thirdLayerKey] === "xx-small") {
      copyStyleSheet[thirdLayerKey] = fontSizeTab[index][0];
      copyStyleSheet["lineHeight"] = lineHeightTab[index][0];
    }
    if (copyStyleSheet[thirdLayerKey] === "small") {
      copyStyleSheet[thirdLayerKey] = fontSizeTab[index][2];
      copyStyleSheet["lineHeight"] = lineHeightTab[index][2];
    }
    if (copyStyleSheet[thirdLayerKey] === "large") {
      copyStyleSheet[thirdLayerKey] = fontSizeTab[index][4];
      copyStyleSheet["lineHeight"] = lineHeightTab[index][4];
    }
    if (copyStyleSheet[thirdLayerKey] === "x-large") {
      copyStyleSheet[thirdLayerKey] = fontSizeTab[index][5];
      copyStyleSheet["lineHeight"] = lineHeightTab[index][5];
    }
    if (copyStyleSheet[thirdLayerKey] === "xx-large") {
      copyStyleSheet[thirdLayerKey] = fontSizeTab[index][6];
      copyStyleSheet["lineHeight"] = lineHeightTab[index][6];
    }
    if (typeof copyStyleSheet[thirdLayerKey] === typeof "string") {
      if (copyStyleSheet[thirdLayerKey].includes("em")) {
        let stringToChange = copyStyleSheet[thirdLayerKey];
        stringToChange.replace("em", "");
        copyStyleSheet[thirdLayerKey] =
          parseFloat(stringToChange) * fontSizeTab[index][3];
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
