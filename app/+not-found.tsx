import { View, StyleSheet } from "react-native";
import { Link, Redirect, Stack } from "expo-router";

export default function NotFoundScreen() {
  return <Redirect href="/" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a202c",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
