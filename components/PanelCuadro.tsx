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
        <MaterialCommunityIcons name={icon} color={colors.primary} size={24} />
      </View>
      <Text style={styles.values}>{value}</Text>
      <Progress.Bar
        progress={barValue}
        color={"rgba(156,108,234,1)"}
        width={340}
        borderWidth={0}
        unfilledColor={"rgba(24,24,27,1)"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.muted,
    flex: 1,
    rowGap: 10,
    borderColor: colors.dark.accent,
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
  },
  title: {
    fontWeight: "500",
    fontSize: 15,
    color: colors.dark.text,
  },
  values: {
    fontSize: 30,
    color: colors.dark.text,
  },
});
