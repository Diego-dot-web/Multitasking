import { colors } from "@/components/Colors";
import PanelCuadro from "@/components/PanelCuadro";
import { StyleSheet, ScrollView, Text } from "react-native";

export default function Panel() {
  return (
    <ScrollView style={styles.container}>
      <Text className="text-3xl text-white font-bold tracking-tight mb-2">
        ¡Bienvenido de vuelta, Aventurero!
      </Text>
      <Text className="text-xl text-muted-foreground mb-4">
        Aquí tienes un resumen de tu progreso en la misión de productividad.
      </Text>
      <PanelCuadro
        title="Misones Completadas"
        value="24/30"
        icon="checkbox-marked-circle-outline"
        barValue={0.7}
      />
      <PanelCuadro
        title="Tiempo Enfocado"
        value="5h 23m"
        icon="clock-outline"
        barValue={0.5}
      />

      <PanelCuadro
        title="Puntos de Experiencia"
        value="1,234 XP"
        icon="bullseye"
        barValue={0.3}
      />

      <PanelCuadro
        title="Logros"
        value="7/20"
        icon="medal-outline"
        barValue={0.2}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.background,
    flex: 1,
    gap: 20,
    padding: 10,
  },
});
