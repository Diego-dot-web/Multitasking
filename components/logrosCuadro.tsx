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
        color={completed ? colors.orange : colors.primary}
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
    backgroundColor: colors.dark.background,
    flex: 1,
    gap: 10,
    padding: 15,
    borderColor: colors.dark.muted,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.primary,
  },
  objective: {
    fontSize: 14,
    color: colors.dark.muted,
  },
  completed: {
    color: colors.dark.text,
    borderColor: colors.dark.accent,
    backgroundColor: colors.primary,
    width: 94,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  nonCompleted: {
    borderColor: colors.primary,
    backgroundColor: colors.dark.background,
    width: 94,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: colors.dark.accent,
  },
});
