import {
  Pressable,
  Text,
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Image } from "expo-image";
import { colors } from "@/components/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

const userImage = require("@/assets/images/usuario.webp");

export default function User() {
  const theme = useColorScheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "dark" ? colors.dark.background : colors.light.background,
        },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={userImage} style={styles.image} />
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 28, color: "white" }}>Nombre del Usuario</Text>
        <Text style={{ color: "gray" }}>Nivel del Usuario</Text>
      </View>
      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          columnGap: 10,
          borderColor: colors.dark.muted,
          borderWidth: 2,
          paddingHorizontal: 50,
          paddingVertical: 10,
          borderRadius: 16,
        }}
      >
        <Ionicons name="settings-outline" color={"white"} size={18} />
        <Text style={{ color: "white", fontSize: 18 }}>Configuración</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 999999,
  },
  imageContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999999,
  },
});
