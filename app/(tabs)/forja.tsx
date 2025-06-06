import { Pressable, Text, View, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { colors } from "@/components/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function Forja() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("25");

  useEffect(() => {
    let interval: NodeJS.Timeout | null | number = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(parseInt(inputMinutes) * 60 || 25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={{ gap: 15 }}>
        <Pressable style={styles.playButton} onPress={toggleTimer}>
          {isActive ? (
            <Ionicons size={24} name="pause-circle-outline" color={"white"} />
          ) : (
            <Ionicons size={24} name="play-circle-outline" color={"white"} />
          )}
          <Text style={{ fontSize: 24, color: "white" }}>
            {isActive ? "Pausar" : "Iniciar"}
          </Text>
        </Pressable>
        <Pressable style={styles.resetIcon} onPress={resetTimer}>
          <Ionicons size={20} name="reload-outline" color={"white"} />
          <Text style={{ color: "white", fontSize: 24 }}>Reiniciar</Text>
        </Pressable>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          Establecer Minutos:
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            flexDirection: "row",
          }}
        >
          <TextInput
            keyboardType="numeric"
            value={inputMinutes}
            onChangeText={setInputMinutes}
            style={{
              color: "white",
              fontSize: 18,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 50,
              backgroundColor: colors.dark.muted,
              borderRadius: 8,
            }}
          />
          <Pressable
            onPress={resetTimer}
            style={{
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center",
              width: 100,
              height: 40,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Establecer</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.background,
    flex: 1,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  timer: {
    fontWeight: "bold",
    fontSize: 80,
    color: colors.dark.text,
  },
  playButton: {
    backgroundColor: colors.dark.text,
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: 20,
    borderRadius: 16,
  },
  resetIcon: {
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: 20,
    borderRadius: 16,
    borderColor: colors.dark.muted,
    borderWidth: 2,
  },
});
