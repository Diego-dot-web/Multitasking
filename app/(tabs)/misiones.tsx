import { ScrollView, TextInput, View, StyleSheet, Text } from "react-native";
import { Pressable } from "react-native";
import { colors } from "@/components/Colors";
import { useEffect, useState, useId } from "react";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { fetch } from "expo/fetch";

export default function Misiones() {
  const [allTodo, setAllTodo] = useState<
    { id: string; text: string; completed: boolean }[]
  >([]);
  const [isFocus, setIsfocus] = useState(false);
  const [todo, setTodo] = useState<string>();
  const id = useId();

  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/todos`!, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((todos: { id: string; text: string; completed: boolean }[]) => {
        const cleanedTodos = todos.map((todo) => ({
          ...todo,
          id: todo.id.trim(),
        }));
        setAllTodo(cleanedTodos);
      });
  }, [todo]);

  const toggleTodo = (id: string) => {
    setAllTodo((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const addTodo = (todo: string | undefined) => {
    try {
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/todos`, {
        method: "POST",
        body: JSON.stringify({ id, text: todo, completed: false }),
      });
      setTodo("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: isFocus
                ? colors.dark.primary.hex
                : colors.dark.primary.foreground.hex,
            },
          ]}
          placeholder="Añadir nueva misión..."
          onFocus={() => {
            setIsfocus(true);
          }}
          onBlur={() => {
            setIsfocus(false);
          }}
          placeholderTextColor={colors.dark.muted.foreground.hex}
          value={todo}
          onChangeText={(text) => setTodo(text)}
        />
        <Pressable
          style={{
            backgroundColor: colors.dark.primary.hex,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => {
            addTodo(todo);
          }}
        >
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={colors.dark.foreground.hex}
          />
          <Text style={{ color: colors.dark.foreground.hex }}>
            Añadir Misison
          </Text>
        </Pressable>
      </View>
      <ScrollView
        style={{
          flex: 1,
          borderColor: colors.dark.primary.foreground.hex,
          borderWidth: 3,
          borderRadius: 10,
          padding: 10,
        }}
      >
        {allTodo.map((todo) => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
            key={todo.id}
          >
            <Checkbox
              value={todo.completed}
              style={{ margin: 8 }}
              onValueChange={() => toggleTodo(todo.id)}
              color={colors.dark.primary.hex}
            />
            <Text
              style={{
                color: "white",
                fontSize: 16,
                textDecorationLine: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.background.hex,
    flex: 1,
    gap: 20,
    padding: 20,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    flex: 2,
    color: "white",
  },
});
