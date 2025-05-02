import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import { colors } from "./Colors";

export default function LogrosCuadro({
  completed,
  title,
  objective,
}: {
  completed: boolean;
  title: string;
  objective: string;
}) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="trophy-outline"
        size={30}
        color={completed ? colors.dark.warning.hex : colors.dark.secondary.hex}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.objective}>{objective}</Text>
      <Text style={completed ? styles.completed : styles.nonCompleted}>
        {completed ? "Completado" : "En Progreso"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.background.hex,
    flex: 1,
    gap: 10,
    padding: 15,
    borderColor: colors.dark.muted.foreground.hex,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.dark.foreground.hex,
  },
  objective: {
    fontSize: 14,
    color: colors.dark.muted.foreground.hex,
  },
  completed: {
    color: colors.dark.foreground.hex,
    borderColor: colors.dark.accent.hex,
    backgroundColor: colors.dark.primary.hex,
    width: 94,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  nonCompleted: {
    borderColor: colors.dark.accent.hex,
    backgroundColor: colors.dark.background.hex,
    width: 94,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: colors.dark.accent.foreground.hex,
  },
});
