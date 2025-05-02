import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import * as NavigationBar from "expo-navigation-bar";
import { colors } from "@/components/Colors";

export default function RootLayout() {
  NavigationBar.setBackgroundColorAsync("black");

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar />
    </>
  );
}
