import React from "react";
import { View } from "react-native";
import { Text, Card } from "react-native-paper";
import ChevronIcon from "../assets/icons/flavorIcons/chevron(default).svg";
import NoDef from "../assets/icons/flavorIcons/notdef-solid.svg";
import { Link } from "expo-router";
export default function ButtonNavigationForFirstTab({
  Logo,
  InnerText,
  navigationPath = "/test",
}) {
  return (
    <Link href={navigationPath}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.container}>
            <View style={[styles.container, styles.containerContent]}>
              {Logo ? (
                <Logo width={24} height={24} />
              ) : (
                <NoDef width={24} height={24} />
              )}
              <Text variant="titleMedium">
                {InnerText ? InnerText : "No Text"}
              </Text>
            </View>
            <Card.Actions style={styles.cardAction}>
              <ChevronIcon />
            </Card.Actions>
          </View>
        </Card.Content>
      </Card>
    </Link>
  );
}

const styles = {
  container: { flexDirection: "row", alignItems: "center" },
  containerContent: {
    margin: 16,
    gap: 16,
    width: "70%",
    alignItems: "center",
    display: "flex",
  },

  cardContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    alignSelf: "stretch",
  },
  card: {
    width: "90%",
    display: "flex",
    height: 80,
    alignItems: "flex-start",
    alignsSelf: "stretch",
  },
};
