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
import { ArrowLeft, Check, KeyRound } from "@/components/Icons";

export default function RecoverPassword({ navigation }) {
  const { isDark } = useTheme();
  const theme = isDark ? colors.dark : colors.light;

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!email) {
      alert("Por favor, ingresa tu correo electrónico");
      return;
    }

    setIsLoading(true);

    // Simulación de envío
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
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
              <KeyRound width={24} height={24} color={colors.primary} />
            </View>
          </View>

          <Text style={[styles.title, { color: theme.text }]}>
            Recuperar Contraseña
          </Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>
            Ingresa tu correo electrónico para recibir instrucciones
          </Text>

          {isSubmitted ? (
            <View style={styles.successContainer}>
              <View
                style={[
                  styles.checkCircle,
                  { backgroundColor: `${colors.green}20` },
                ]}
              >
                <Check width={24} height={24} color={colors.green} />
              </View>

              <Text style={[styles.successText, { color: theme.text }]}>
                Hemos enviado un correo electrónico con instrucciones para
                recuperar tu contraseña. Por favor, revisa tu bandeja de
                entrada.
              </Text>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.outlineButton,
                  { borderColor: theme.border },
                ]}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={[styles.outlineButtonText, { color: theme.text }]}>
                  Volver al inicio de sesión
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
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

              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: colors.primary },
                  isLoading && styles.buttonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? "Enviando..." : "Enviar instrucciones"}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Login")}
          >
            <ArrowLeft width={16} height={16} color={colors.primary} />
            <Text style={[styles.backButtonText, { color: colors.primary }]}>
              Volver al inicio de sesión
            </Text>
          </TouchableOpacity>
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
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  successContainer: {
    alignItems: "center",
    gap: 16,
    marginVertical: 16,
  },
  checkCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  successText: {
    textAlign: "center",
    lineHeight: 22,
  },
});
