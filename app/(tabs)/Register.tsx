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
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { colors } from "@/components/Colors";
import { Card } from "@/components/Card";
import { Eye, EyeOff, UserPlus } from "@/components/Icons";

export default function Register({ navigation }) {
  const { isDark } = useTheme();
  const theme = isDark ? colors.dark : colors.light;

  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPasswordStrength = (password) => {
    if (!password) return null;

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    if (strength < 2) return { level: "weak", color: colors.red };
    if (strength < 4) return { level: "medium", color: colors.yellow };
    return { level: "strong", color: colors.green };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleRegister = () => {
    if (!nombre || !usuario || !email || !password || !confirmPassword) {
      alert("Por favor, completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);

    // Simulación de registro
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("Login");
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
              <UserPlus width={24} height={24} color={colors.primary} />
            </View>
          </View>

          <Text style={[styles.title, { color: theme.text }]}>
            Crear Cuenta
          </Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>
            Únete a la aventura de productividad
          </Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>
                Nombre completo
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
                placeholder="Ingresa tu nombre"
                placeholderTextColor={theme.muted}
                value={nombre}
                onChangeText={setNombre}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>
                Nombre de usuario
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
                placeholder="Elige un nombre de usuario"
                placeholderTextColor={theme.muted}
                value={usuario}
                onChangeText={setUsuario}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>
                Correo electrónico
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
                  placeholder="Crea una contraseña segura"
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

              {passwordStrength && (
                <View style={styles.strengthContainer}>
                  <View
                    style={[
                      styles.strengthBar,
                      {
                        width:
                          passwordStrength.level === "weak"
                            ? "33%"
                            : passwordStrength.level === "medium"
                              ? "66%"
                              : "100%",
                        backgroundColor: passwordStrength.color,
                      },
                    ]}
                  />
                </View>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>
                Confirmar contraseña
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
                  placeholder="Repite tu contraseña"
                  placeholderTextColor={theme.muted}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff width={20} height={20} color={theme.muted} />
                  ) : (
                    <Eye width={20} height={20} color={theme.muted} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: colors.primary },
                isLoading && styles.buttonDisabled,
              ]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Creando cuenta..." : "Crear cuenta"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.muted }]}>
              ¿Ya tienes una cuenta?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.footerLink, { color: colors.primary }]}>
                Inicia sesión
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
  strengthContainer: {
    height: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 8,
  },
  strengthBar: {
    height: "100%",
    borderRadius: 2,
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
