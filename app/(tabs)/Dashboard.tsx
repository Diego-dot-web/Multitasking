import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { colors } from "@/components/Colors";
import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import { StatsCard } from "@/components/StatsCard";
import {
  Award,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Zap,
} from "@/components/Icons";

export default function Dashboard() {
  const { isDark } = useTheme();
  const theme = isDark ? colors.dark : colors.light;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          ¡Bienvenido de vuelta, Aventurero!
        </Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>
          Aquí tienes un resumen de tu progreso en la misión de productividad.
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <StatsCard
          title="Misiones Completadas"
          value="24/30"
          description="80% de tus misiones"
          progress={80}
          icon={<CheckCircle width={20} height={20} color={colors.primary} />}
          trend="+3 hoy"
        />
        <StatsCard
          title="Tiempo Enfocado"
          value="5h 23m"
          description="67% de tu objetivo"
          progress={67}
          icon={<Clock width={20} height={20} color={colors.purple} />}
          trend="+45m hoy"
        />
        <StatsCard
          title="Puntos de Experiencia"
          value="1,234 XP"
          description="45% para el siguiente nivel"
          progress={45}
          icon={<Target width={20} height={20} color={colors.orange} />}
          trend="+120 XP hoy"
        />
        <StatsCard
          title="Logros"
          value="7/20"
          description="35% completados"
          progress={35}
          icon={<Award width={20} height={20} color={colors.yellow} />}
          trend="1 nuevo"
        />
      </View>

      <View style={styles.cardsContainer}>
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <TrendingUp width={20} height={20} color={colors.primary} />
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                Racha Actual
              </Text>
            </View>
            <Text style={[styles.cardDescription, { color: theme.muted }]}>
              Mantén tu racha para ganar bonificaciones
            </Text>
          </View>

          <View style={styles.streakContainer}>
            <View>
              <Text style={[styles.streakValue, { color: theme.text }]}>
                7 días
              </Text>
              <Text style={[styles.streakBest, { color: theme.muted }]}>
                Mejor racha: 14 días
              </Text>
            </View>
            <View style={styles.streakDays}>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <View
                  key={day}
                  style={[
                    styles.streakDay,
                    { backgroundColor: `${colors.primary}20` },
                  ]}
                >
                  <Text style={{ color: colors.primary }}>{day}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Zap width={20} height={20} color={colors.yellow} />
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                Próximo Nivel
              </Text>
            </View>
            <Text style={[styles.cardDescription, { color: theme.muted }]}>
              Nivel 6: Maestro Táctico
            </Text>
          </View>

          <View style={styles.levelContainer}>
            <View style={styles.levelLabels}>
              <Text style={[styles.levelLabel, { color: theme.text }]}>
                Nivel 5
              </Text>
              <Text style={[styles.levelLabel, { color: theme.text }]}>
                Nivel 6
              </Text>
            </View>
            <ProgressBar progress={45} />
            <View style={styles.levelLabels}>
              <Text style={[styles.xpLabel, { color: theme.muted }]}>
                1,234 XP
              </Text>
              <Text style={[styles.xpLabel, { color: theme.muted }]}>
                2,000 XP necesarios
              </Text>
            </View>

            <View
              style={[
                styles.rewardsContainer,
                { backgroundColor: `${theme.muted}20` },
              ]}
            >
              <Text style={[styles.rewardsTitle, { color: theme.text }]}>
                Recompensas del Nivel 6:
              </Text>
              <View style={styles.rewardItem}>
                <View
                  style={[styles.dot, { backgroundColor: colors.primary }]}
                />
                <Text style={[styles.rewardText, { color: theme.text }]}>
                  Nuevos temas visuales
                </Text>
              </View>
              <View style={styles.rewardItem}>
                <View
                  style={[styles.dot, { backgroundColor: colors.primary }]}
                />
                <Text style={[styles.rewardText, { color: theme.text }]}>
                  Temporizador personalizable
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  cardsContainer: {
    marginTop: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  cardDescription: {
    fontSize: 14,
  },
  streakContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streakValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  streakBest: {
    fontSize: 14,
  },
  streakDays: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 200,
    gap: 4,
  },
  streakDay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  levelContainer: {
    gap: 8,
  },
  levelLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  levelLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  xpLabel: {
    fontSize: 12,
  },
  rewardsContainer: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  rewardsTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  rewardItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  rewardText: {
    fontSize: 14,
  },
});
