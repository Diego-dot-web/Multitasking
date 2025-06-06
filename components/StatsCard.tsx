import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { colors } from "@/components/Colors";
import { Card } from "./Card";
import { ProgressBar } from "./ProgressBar";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  progress: number;
  icon: React.ReactNode;
  trend?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  progress,
  icon,
  trend,
}) => {
  const { isDark } = useTheme();
  const theme = isDark ? colors.dark : colors.light;

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        {icon}
      </View>

      <View style={styles.content}>
        <View style={styles.valueRow}>
          <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
          {trend && (
            <View
              style={[
                styles.trendBadge,
                { backgroundColor: `${colors.primary}20` },
              ]}
            >
              <Text style={[styles.trendText, { color: colors.primary }]}>
                {trend}
              </Text>
            </View>
          )}
        </View>

        <ProgressBar progress={progress} style={styles.progressBar} />

        <Text style={[styles.description, { color: theme.muted }]}>
          {description}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "48%",
    marginHorizontal: "1%",
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    gap: 8,
  },
  valueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
  },
  trendBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: "500",
  },
  progressBar: {
    marginVertical: 4,
  },
  description: {
    fontSize: 12,
  },
});

