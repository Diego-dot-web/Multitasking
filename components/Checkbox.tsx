import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Check } from "./Icons";
import { colors } from "@/components/Colors";
import { useTheme } from "../context/ThemeContext";

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onToggle }) => {
  const { isDark } = useTheme();
  const theme = isDark ? colors.dark : colors.light;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: checked ? colors.primary : "transparent",
          borderColor: checked ? colors.primary : theme.border,
        },
      ]}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      {checked && <Check width={12} height={12} color="#fff" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

