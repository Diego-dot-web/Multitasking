import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { colors } from "@/components/Colors";
import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import {
  Trophy,
  Star,
  Clock,
  CheckCircle,
  Zap,
  Calendar,
  Target,
  Award,
} from "@/components/Icons";

// Datos de ejemplo para los logros
const achievements = [
  {
    id: 1,
    name: "Madrugador",
    description: "Completa 5 tareas antes de las 9 AM",
    completed: true,
    progress: 100,
    icon: <Clock width={20} height={20} color={colors.yellow} />,
    color: colors.yellow,
    date: "12 May 2025",
  },
  {
    id: 2,
    name: "Maestro del Enfoque",
    description: "Usa el temporizador durante 2 horas seguidas",
    completed: false,
    progress: 65,
    icon: <Target width={20} height={20} color={colors.purple} />,
    color: colors.purple,
    date: null,
  },
  {
    id: 3,
    name: "Campeón de Misiones",
    description: "Completa 50 misiones",
    completed: true,
    progress: 100,
    icon: <CheckCircle width={20} height={20} color={colors.green} />,
    color: colors.green,
    date: "10 May 2025",
  },
  {
    id: 4,
    name: "Señor del Tiempo",
    description: "Acumula 24 horas de tiempo enfocado",
    completed: false,
    progress: 45,
    icon: <Clock width={20} height={20} color={colors.primary} />,
    color: colors.primary,
    date: null,
  },
  {
    id: 5,
    name: "Guardián de la Racha",
    description: "Mantén una racha de 7 días",
    completed: true,
    progress: 100,
    icon: <Calendar width={20} height={20} color={colors.orange} />,
    color: colors.orange,
    date: "8 May 2025",
  },
  {
    id: 6,
    name: "Conquistador",
    description:
      "Completa todas tus tareas programadas durante 3 días consecutivos",
    completed: false,
    progress: 33,
    icon: <Award width={20} height={20} color={colors.purple} />,
    color: colors.purple,
    date: null,
  },
  {
    id: 7,
    name: "Velocista",
    description: "Completa 5 tareas en menos de 2 horas",
    completed: false,
    progress: 80,
    icon: <Zap width={20} height={20} color={colors.red} />,
    color: colors.red,
    date: null,
  },
  {
    id: 8,
    name: "Estratega",
    description: "Organiza tus tareas por prioridad durante 5 días",
    completed: true,
    progress: 100,
    icon: <Target width={20} height={20} color={colors.green} />,
    color: colors.green,
    date: "5 May 2025",
  },
];

export default function Achievements() {
  const { isDark } = useTheme();
  const theme = isDark ? colors.dark : colors.light;

  // Calcular estadísticas
  const totalAchievements = achievements.length;
  const completedAchievements = achievements.filter((a) => a.completed).length;
  const completionPercentage = Math.round(
    (completedAchievements / totalAchievements) * 100,
  );

  // Agrupar logros
  const completedAchievementsList = achievements.filter((a) => a.completed);
  const inProgressAchievementsList = achievements
    .filter((a) => !a.completed)
    .sort((a, b) => b.progress - a.progress);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Tus Logros</Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>
          Sigue tu progreso y desbloquea recompensas en tu aventura de
          productividad.
        </Text>
      </View>

      <View style={styles.statsCard}>
        <Card style={styles.progressCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Trophy width={20} height={20} color={colors.yellow} />
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                Progreso General
              </Text>
            </View>
          </View>

          <View style={styles.progressCircleContainer}>
            <View style={styles.progressCircle}>
              <CircularProgress
                percentage={completionPercentage}
                radius={50}
                strokeWidth={10}
                color={colors.primary}
                bgColor={`${theme.muted}40`}
              />
              <View style={styles.progressTextContainer}>
                <Text
                  style={[styles.progressPercentage, { color: theme.text }]}
                >
                  {completionPercentage}%
                </Text>
              </View>
            </View>

            <View style={styles.progressStats}>
              <Text style={[styles.progressStatsText, { color: theme.text }]}>
                {completedAchievements} de {totalAchievements}
              </Text>
              <Text style={[styles.progressStatsLabel, { color: theme.muted }]}>
                Logros completados
              </Text>
            </View>
          </View>
        </Card>

        <Card style={styles.upcomingCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleContainer}>
              <Star width={20} height={20} color={colors.yellow} />
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                Próximos Logros
              </Text>
            </View>
          </View>

          <View style={styles.upcomingList}>
            {inProgressAchievementsList.slice(0, 3).map((achievement) => (
              <View key={achievement.id} style={styles.upcomingItem}>
                <View style={styles.upcomingHeader}>
                  <View style={styles.upcomingTitleContainer}>
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: `${achievement.color}20` },
                      ]}
                    >
                      {achievement.icon}
                    </View>
                    <Text style={[styles.upcomingTitle, { color: theme.text }]}>
                      {achievement.name}
                    </Text>
                  </View>
                  <Text
                    style={[styles.upcomingProgress, { color: theme.muted }]}
                  >
                    {achievement.progress}%
                  </Text>
                </View>
                <ProgressBar
                  progress={achievement.progress}
                  color={achievement.color}
                  style={styles.upcomingProgressBar}
                />
              </View>
            ))}
          </View>
        </Card>
      </View>

      <Card style={styles.achievementsCard}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Logros Desbloqueados
          </Text>
          <Text style={[styles.cardDescription, { color: theme.muted }]}>
            Has completado {completedAchievements} de {totalAchievements} logros
            ({completionPercentage}%)
          </Text>
        </View>

        {completedAchievementsList.length > 0 && (
          <View style={styles.achievementsSection}>
            <Text style={[styles.sectionTitle, { color: theme.muted }]}>
              COMPLETADOS
            </Text>
            {completedAchievementsList.map((achievement) => (
              <AchievementItem
                key={achievement.id}
                achievement={achievement}
                theme={theme}
              />
            ))}
          </View>
        )}

        {inProgressAchievementsList.length > 0 && (
          <View style={styles.achievementsSection}>
            <Text style={[styles.sectionTitle, { color: theme.muted }]}>
              EN PROGRESO
            </Text>
            {inProgressAchievementsList.map((achievement) => (
              <AchievementItem
                key={achievement.id}
                achievement={achievement}
                theme={theme}
              />
            ))}
          </View>
        )}
      </Card>
    </ScrollView>
  );
}

// Componente para cada elemento de logro
const AchievementItem = ({ achievement, theme }) => {
  return (
    <View
      style={[
        styles.achievementItem,
        {
          backgroundColor: achievement.completed
            ? `${theme.muted}10`
            : "transparent",
          borderBottomColor: theme.border,
        },
      ]}
    >
      <View
        style={[
          styles.achievementIcon,
          {
            backgroundColor: achievement.completed
              ? `${achievement.color}20`
              : `${theme.muted}20`,
          },
        ]}
      >
        {achievement.icon}
      </View>

      <View style={styles.achievementContent}>
        <View style={styles.achievementHeader}>
          <Text style={[styles.achievementTitle, { color: theme.text }]}>
            {achievement.name}
          </Text>
          <View
            style={[
              styles.achievementBadge,
              {
                backgroundColor: achievement.completed
                  ? achievement.color
                  : "transparent",
                borderColor: achievement.completed
                  ? achievement.color
                  : theme.border,
              },
            ]}
          >
            <Text
              style={[
                styles.achievementBadgeText,
                {
                  color: achievement.completed ? "#fff" : theme.muted,
                },
              ]}
            >
              {achievement.completed ? "Completado" : "En Progreso"}
            </Text>
          </View>
        </View>

        <Text style={[styles.achievementDescription, { color: theme.muted }]}>
          {achievement.description}
        </Text>

        {!achievement.completed && (
          <View style={styles.achievementProgressContainer}>
            <View style={styles.achievementProgressHeader}>
              <Text
                style={[
                  styles.achievementProgressLabel,
                  { color: theme.muted },
                ]}
              >
                Progreso
              </Text>
              <Text
                style={[
                  styles.achievementProgressValue,
                  { color: theme.muted },
                ]}
              >
                {achievement.progress}%
              </Text>
            </View>
            <ProgressBar
              progress={achievement.progress}
              color={achievement.color}
              style={styles.achievementProgressBar}
            />
          </View>
        )}

        {achievement.completed && achievement.date && (
          <Text style={[styles.achievementDate, { color: theme.muted }]}>
            Completado el {achievement.date}
          </Text>
        )}
      </View>
    </View>
  );
};

// Componente para el progreso circular
const CircularProgress = ({
  percentage,
  radius,
  strokeWidth,
  color,
  bgColor,
}) => {
  const circumference = 2 * Math.PI * radius;
  const progressStrokeDashoffset =
    circumference - (circumference * percentage) / 100;

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      >
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={progressStrokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, ${radius}, ${radius})`}
        />
      </Svg>
    </View>
  );
};

// Importaciones necesarias para el círculo de progreso
import Svg, { Circle } from "react-native-svg";

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
  statsCard: {
    flexDirection: "column",
    gap: 16,
    marginBottom: 16,
  },
  progressCard: {
    padding: 16,
  },
  upcomingCard: {
    padding: 16,
  },
  achievementsCard: {
    padding: 16,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
  },
  progressCircleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  progressCircle: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  progressTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: "bold",
  },
  progressStats: {
    alignItems: "center",
  },
  progressStatsText: {
    fontSize: 18,
    fontWeight: "500",
  },
  progressStatsLabel: {
    fontSize: 14,
  },
  upcomingList: {
    gap: 16,
  },
  upcomingItem: {
    gap: 8,
  },
  upcomingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upcomingTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconContainer: {
    padding: 6,
    borderRadius: 20,
  },
  upcomingTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  upcomingProgress: {
    fontSize: 12,
  },
  upcomingProgressBar: {
    height: 6,
  },
  achievementsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 12,
    letterSpacing: 1,
  },
  achievementItem: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    marginBottom: 8,
    borderRadius: 8,
  },
  achievementIcon: {
    padding: 8,
    borderRadius: 24,
    marginRight: 12,
    alignSelf: "flex-start",
  },
  achievementContent: {
    flex: 1,
    gap: 4,
  },
  achievementHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  achievementBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  achievementBadgeText: {
    fontSize: 10,
    fontWeight: "500",
  },
  achievementDescription: {
    fontSize: 14,
  },
  achievementProgressContainer: {
    marginTop: 8,
    gap: 4,
  },
  achievementProgressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  achievementProgressLabel: {
    fontSize: 12,
  },
  achievementProgressValue: {
    fontSize: 12,
  },
  achievementProgressBar: {
    height: 4,
  },
  achievementDate: {
    fontSize: 12,
    marginTop: 4,
  },
});
