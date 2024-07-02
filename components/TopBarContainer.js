import React from "react";
import { View, StyleSheet } from "react-native";
import { useState } from "react";

export default function TopBarContainer({ children }) {
  return (
    <View style={styles.container}>
      <View style={styles.phoneNotif} />
      <View style={styles.headerContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  phoneNotif: { height: "40%" },
  headerContainer: { height: 360 },
});
