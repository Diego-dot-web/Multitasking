import { Stack } from "expo-router";
import "../global.css";
import * as NavigationBar from "expo-navigation-bar";

export default function RootLayout() {
  NavigationBar.setBackgroundColorAsync("black");

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}
