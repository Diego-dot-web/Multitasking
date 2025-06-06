import React, { useState } from "react";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./Dashboard";
import TodoList from "./TodoList";
import Timer from "./Timer";
import Achievements from "./Achievements";
import Login from "./Login";
import Register from "./Register";
import RecoverPassword from "./RecoverPassword";
import {
  Award,
  CheckCircle,
  Clock,
  Target,
  UserIcon,
  UserPlus,
} from "@/components/Icons";
import { ThemeProvider } from "../../context/ThemeContext";
import { colors } from "@/components/Colors";
import User from "./user";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  const colorScheme = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Dashboard":
              return <Target width={size} height={size} color={color} />;
            case "Misiones":
              return <CheckCircle width={size} height={size} color={color} />;
            case "Forja del Tiempo":
              return <Clock width={size} height={size} color={color} />;
            case "Logros":
              return <Award width={size} height={size} color={color} />;
            case "Usuario":
              return <UserIcon width={size} height={size} color={color} />;
            default:
              return null;
          }
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: true,
        headerTitle: "Multitasking",
        headerTitleStyle: {
          color: colors.primary,
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor:
            colorScheme === "dark"
              ? colors.dark.background
              : colors.light.background,
        },
        tabBarStyle: {
          backgroundColor:
            colorScheme === "dark"
              ? colors.dark.background
              : colors.light.background,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Misiones" component={TodoList} />
      <Tab.Screen name="Forja del Tiempo" component={Timer} />
      <Tab.Screen name="Logros" component={Achievements} />
      <Tab.Screen name="Usuario" component={User} />
    </Tab.Navigator>
  );
}

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={
          colorScheme === "dark"
            ? colors.dark.background
            : colors.light.background
        }
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      </Stack.Navigator>
    </ThemeProvider>
  );
}
