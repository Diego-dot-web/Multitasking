import LogrosCuadro from "@/components/logrosCuadro";
import { ScrollView, StyleSheet } from "react-native";
import { colors } from "@/components/Colors";

const achievements = [
  {
    id: 1,
    name: "Madrugador",
    description: "Completa 5 tareas antes de las 9 AM",
    completed: true,
  },
  {
    id: 2,
    name: "Maestro del Enfoque",
    description: "Usa el temporizador durante 2 horas seguidas",
    completed: false,
  },
  {
    id: 3,
    name: "Campeón de Misiones",
    description: "Completa 50 misiones",
    completed: true,
  },
  {
    id: 4,
    name: "Señor del Tiempo",
    description: "Acumula 24 horas de tiempo enfocado",
    completed: false,
  },
  {
    id: 5,
    name: "Guardián de la Racha",
    description: "Mantén una racha de 7 días",
    completed: true,
  },
];
export default function Logros() {
  return (
    <ScrollView style={styles.container}>
      {achievements.map((item) => (
        <LogrosCuadro
          key={item.id}
          title={item.name}
          objective={item.description}
          completed={item.completed}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.background,
    flex: 1,
    gap: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.primary,
  },
  values: {
    fontSize: 30,
    color: colors.dark.text,
  },
});
