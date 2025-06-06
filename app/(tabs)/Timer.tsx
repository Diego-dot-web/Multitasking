import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { colors } from "@/components/Colors";
import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import {
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Bell,
  BellOff,
  Settings,
} from "@/components/Icons";

export default function Timer() {
  const { isDark } = useTheme();
  const theme = isDark ? colors.dark : colors.light;

  const [time, setTime] = useState(25 * 60);
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("25");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [timerType, setTimerType] = useState<"focus" | "short" | "long">(
    "focus",
  );
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const progressAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);

      // Reproducir sonido si está habilitado
      if (soundEnabled) {
        // Aquí iría la lógica para reproducir un sonido
        console.log("Sound played");
      }

      // Incrementar sesiones completadas si era un temporizador de enfoque
      if (timerType === "focus") {
        setSessionsCompleted((prev) => prev + 1);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, soundEnabled, timerType]);

  // Actualizar la animación del progreso
  useEffect(() => {
    const progress = (initialTime - time) / initialTime;

    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [time, initialTime, progressAnimation]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(initialTime);
  };

  const handleTimerTypeChange = (type: "focus" | "short" | "long") => {
    setIsActive(false);
    setTimerType(type);

    let newTime = 0;
    switch (type) {
      case "focus":
        newTime = 25 * 60;
        break;
      case "short":
        newTime = 5 * 60;
        break;
      case "long":
        newTime = 15 * 60;
        break;
    }

    setTime(newTime);
    setInitialTime(newTime);
    setInputMinutes(String(newTime / 60));
  };

  const setCustomTime = () => {
    const minutes = parseInt(inputMinutes) || 25;
    const newTime = Math.min(Math.max(minutes, 1), 120) * 60;
    setTime(newTime);
    setInitialTime(newTime);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    switch (timerType) {
      case "focus":
        return colors.primary;
      case "short":
        return colors.green;
      case "long":
        return colors.purple;
    }
  };

  const getTimerTitle = () => {
    switch (timerType) {
      case "focus":
        return "Tiempo de Enfoque";
      case "short":
        return "Descanso Corto";
      case "long":
        return "Descanso Largo";
    }
  };

  const timerColor = getTimerColor();
  const strokeDasharray = 2 * Math.PI * 70;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Forja del Tiempo
        </Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>
          Utiliza la técnica Pomodoro para maximizar tu concentración y
          productividad.
        </Text>
      </View>

      <View style={styles.timerContainer}>
        <Card style={styles.timerCard}>
          <View style={styles.timerHeader}>
            <View>
              <View style={styles.timerTitleContainer}>
                {timerType === "focus" ? (
                  <PlayCircle width={20} height={20} color={timerColor} />
                ) : (
                  <RotateCcw width={20} height={20} color={timerColor} />
                )}
                <Text style={[styles.timerTitle, { color: timerColor }]}>
                  {getTimerTitle()}
                </Text>
              </View>
              <Text style={[styles.timerDescription, { color: theme.muted }]}>
                {timerType === "focus"
                  ? "Concéntrate en tu tarea actual"
                  : "Tómate un descanso y recarga energías"}
              </Text>
            </View>

            <View style={styles.timerControls}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? (
                  <Bell width={16} height={16} color={theme.muted} />
                ) : (
                  <BellOff width={16} height={16} color={theme.muted} />
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}>
                <Settings width={16} height={16} color={theme.muted} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.timerCircleContainer}>
            <View style={styles.timerCircle}>
              <Svg width={180} height={180}>
                <Circle
                  cx={90}
                  cy={90}
                  r={70}
                  stroke={theme.border}
                  strokeWidth={8}
                  fill="transparent"
                />
                <AnimatedCircle
                  cx={90}
                  cy={90}
                  r={70}
                  stroke={timerColor}
                  strokeWidth={8}
                  fill="transparent"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={progressAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [strokeDasharray, 0],
                  })}
                  strokeLinecap="round"
                />
              </Svg>
              <Text style={[styles.timerText, { color: theme.text }]}>
                {formatTime(time)}
              </Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: timerColor }]}
              onPress={toggleTimer}
            >
              {isActive ? (
                <>
                  <PauseCircle width={20} height={20} color="#fff" />
                  <Text style={styles.buttonText}>Pausar</Text>
                </>
              ) : (
                <>
                  <PlayCircle width={20} height={20} color="#fff" />
                  <Text style={styles.buttonText}>Iniciar</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, { borderColor: theme.border }]}
              onPress={resetTimer}
            >
              <RotateCcw width={20} height={20} color={theme.text} />
              <Text style={[styles.secondaryButtonText, { color: theme.text }]}>
                Reiniciar
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.timerTypeButtons}>
            <TouchableOpacity
              style={[
                styles.timerTypeButton,
                timerType === "focus"
                  ? { backgroundColor: colors.primary }
                  : { borderColor: theme.border },
              ]}
              onPress={() => handleTimerTypeChange("focus")}
            >
              <Text
                style={[
                  styles.timerTypeText,
                  { color: timerType === "focus" ? "#fff" : colors.primary },
                ]}
              >
                Enfoque
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.timerTypeButton,
                timerType === "short"
                  ? { backgroundColor: colors.green }
                  : { borderColor: theme.border },
              ]}
              onPress={() => handleTimerTypeChange("short")}
            >
              <Text
                style={[
                  styles.timerTypeText,
                  { color: timerType === "short" ? "#fff" : colors.green },
                ]}
              >
                Descanso Corto
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.timerTypeButton,
                timerType === "long"
                  ? { backgroundColor: colors.purple }
                  : { borderColor: theme.border },
              ]}
              onPress={() => handleTimerTypeChange("long")}
            >
              <Text
                style={[
                  styles.timerTypeText,
                  { color: timerType === "long" ? "#fff" : colors.purple },
                ]}
              >
                Descanso Largo
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Card style={styles.statsCard}>
          <Text style={[styles.statsTitle, { color: theme.text }]}>
            Estadísticas
          </Text>
          <Text style={[styles.statsSubtitle, { color: theme.muted }]}>
            Tu progreso de hoy
          </Text>

          <View style={styles.statsSection}>
            <View style={styles.statHeader}>
              <Text style={[styles.statLabel, { color: theme.text }]}>
                Sesiones completadas
              </Text>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {sessionsCompleted}
              </Text>
            </View>
            <ProgressBar
              progress={Math.min(sessionsCompleted * 12.5, 100)}
              style={styles.progressBar}
            />
            <Text style={[styles.statNote, { color: theme.muted }]}>
              Objetivo: 8 sesiones diarias
            </Text>
          </View>

          <View style={styles.customTimeSection}>
            <Text style={[styles.customTimeTitle, { color: theme.text }]}>
              Tiempo personalizado
            </Text>
            <View style={styles.customTimeInput}>
              <TextInput
                style={[
                  styles.timeInput,
                  {
                    color: theme.text,
                    borderColor: theme.border,
                    backgroundColor: isDark ? theme.card : theme.background,
                  },
                ]}
                keyboardType="number-pad"
                value={inputMinutes}
                onChangeText={setInputMinutes}
                maxLength={3}
              />
              <TouchableOpacity
                style={[styles.setButton, { backgroundColor: theme.muted }]}
                onPress={setCustomTime}
              >
                <Text style={styles.setButtonText}>Establecer</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[
              styles.tipsContainer,
              { backgroundColor: `${theme.muted}20` },
            ]}
          >
            <Text style={[styles.tipsTitle, { color: theme.text }]}>
              Consejos para la productividad
            </Text>
            <View style={styles.tipItem}>
              <View
                style={[styles.tipDot, { backgroundColor: colors.primary }]}
              />
              <Text style={[styles.tipText, { color: theme.muted }]}>
                Trabaja en bloques de 25 minutos con descansos cortos
              </Text>
            </View>
            <View style={styles.tipItem}>
              <View
                style={[styles.tipDot, { backgroundColor: colors.primary }]}
              />
              <Text style={[styles.tipText, { color: theme.muted }]}>
                Después de 4 bloques, toma un descanso largo
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

// Importaciones necesarias para el círculo animado
import Svg, { Circle } from "react-native-svg";
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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
  timerContainer: {
    gap: 16,
  },
  timerCard: {
    padding: 16,
  },
  timerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  timerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  timerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  timerDescription: {
    fontSize: 14,
  },
  timerControls: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  timerCircleContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  timerCircle: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    position: "absolute",
    fontSize: 36,
    fontWeight: "bold",
    fontVariant: ["tabular-nums"],
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 16,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  timerTypeButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  timerTypeButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  timerTypeText: {
    fontWeight: "500",
  },
  statsCard: {
    padding: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statsSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  statsSection: {
    marginBottom: 16,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  progressBar: {
    marginBottom: 8,
  },
  statNote: {
    fontSize: 12,
  },
  customTimeSection: {
    marginBottom: 16,
  },
  customTimeTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  customTimeInput: {
    flexDirection: "row",
    gap: 8,
  },
  timeInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    textAlign: "center",
  },
  setButton: {
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  setButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  tipsContainer: {
    padding: 12,
    borderRadius: 8,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  tipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    marginRight: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
  },
});
