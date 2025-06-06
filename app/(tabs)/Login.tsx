import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { colors } from "@/components/Colors";
import { Card } from "@/components/Card";
import { Eye, EyeOff, LogIn } from "@/components/Icons";

export default function Login({ navigation }) {
  const { isDark } = useTheme();
  const theme = isDark ? colors.dark : colors.light;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Por favor, completa todos los campos");
      return;
    }

    setIsLoading(true);

    // Simulación de inicio de sesión
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("Main");
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.appName, { color: colors.primary }]}>
            Misión Productividad
          </Text>
        </View>

        <Card style={styles.card}>
          <View style={styles.iconContainer}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: `${colors.primary}20` },
              ]}
            >
              <LogIn width={24} height={24} color={colors.primary} />
            </View>
          </View>

          <Text style={[styles.title, { color: theme.text }]}>
            Iniciar Sesión
          </Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>
            Continúa tu misión de productividad
          </Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>
                Correo electrónico o usuario
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.text,
                    borderColor: theme.border,
                    backgroundColor: isDark ? theme.card : theme.background,
                  },
                ]}
                placeholder="correo@ejemplo.com"
                placeholderTextColor={theme.muted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>
                Contraseña
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    {
                      color: theme.text,
                      borderColor: theme.border,
                      backgroundColor: isDark ? theme.card : theme.background,
                    },
                  ]}
                  placeholder="Tu contraseña"
                  placeholderTextColor={theme.muted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff width={20} height={20} color={theme.muted} />
                  ) : (
                    <Eye width={20} height={20} color={theme.muted} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.options}>
              <TouchableOpacity
                onPress={() => navigation.navigate("RecoverPassword")}
              >
                <Text
                  style={[styles.forgotPassword, { color: colors.primary }]}
                >
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: colors.primary },
                isLoading && styles.buttonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.muted }]}>
              ¿No tienes una cuenta?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={[styles.footerLink, { color: colors.primary }]}>
                Regístrate
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    padding: 24,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  options: {
    alignItems: "flex-end",
  },
  forgotPassword: {
    fontSize: 14,
  },
  button: {
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});
