import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "./Colors";

export default function PanelCuadro({
  title,
  value,
  icon,
  barValue,
}: {
  title: string;
  value: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  barValue: number;
}) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>{title}</Text>
        <MaterialCommunityIcons name={icon} color="white" size={24} />
      </View>
      <Text style={styles.values}>{value}</Text>
      <Progress.Bar progress={barValue} color={"white"} width={340} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.background.hex,
    flex: 1,
    gap: 20,
    borderColor: colors.dark.foreground.hex,
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.dark.foreground.hex,
  },
  values: {
    fontSize: 30,
    color: colors.dark.foreground.hex,
  },
});
