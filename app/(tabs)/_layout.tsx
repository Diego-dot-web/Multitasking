import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import "../../global.css";
import { colors } from "@/components/Colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.dark.primary.hex,
        headerStyle: {
          backgroundColor: colors.dark.background.hex,
        },
        headerTitleStyle: {
          fontSize: 40,
        },
        headerShadowVisible: false,

        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: colors.dark.background.hex,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Panel",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="logros"
        options={{
          title: "Logros",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "medal-sharp" : "medal-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="misiones"
        options={{
          title: "Misiones",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "reader" : "reader-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="forja"
        options={{
          title: "Forja del Tiempo",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "timer-sharp" : "timer-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: "Usuario",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person-circle-sharp" : "person-circle-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
