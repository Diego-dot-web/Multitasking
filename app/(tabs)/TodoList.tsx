import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../context/ThemeContext";
import { colors } from "@/components/Colors";
import { Card } from "@/components/Card";
import { Checkbox } from "@/components/Checkbox";
import { PlusCircle, Trash2, Filter, SortDesc } from "@/components/Icons";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: number;
}

export default function TodoList() {
  const { isDark } = useTheme();
  const theme = isDark ? colors.dark : colors.light;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sort, setSort] = useState<"newest" | "oldest" | "priority">("newest");
  const [newTodoPriority, setNewTodoPriority] = useState<
    "low" | "medium" | "high"
  >("medium");

  // Cargar tareas desde AsyncStorage
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const savedTodos = await AsyncStorage.getItem("todos");
        if (savedTodos) {
          setTodos(JSON.parse(savedTodos));
        }
      } catch (e) {
        console.error("Error loading todos", e);
      }
    };

    loadTodos();
  }, []);

  // Guardar tareas en AsyncStorage cuando cambien
  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem("todos", JSON.stringify(todos));
      } catch (e) {
        console.error("Error saving todos", e);
      }
    };

    saveTodos();
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem: Todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        priority: newTodoPriority,
        createdAt: Date.now(),
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
      setNewTodoPriority("medium");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    Alert.alert(
      "Eliminar misión",
      "¿Estás seguro de que quieres eliminar esta misión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            setTodos(todos.filter((todo) => todo.id !== id));
          },
          style: "destructive",
        },
      ],
    );
  };

  const showFilterMenu = () => {
    Alert.alert("Filtrar misiones", "Selecciona un filtro", [
      { text: "Todas", onPress: () => setFilter("all") },
      { text: "Activas", onPress: () => setFilter("active") },
      { text: "Completadas", onPress: () => setFilter("completed") },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const showSortMenu = () => {
    Alert.alert("Ordenar misiones", "Selecciona un orden", [
      { text: "Más recientes", onPress: () => setSort("newest") },
      { text: "Más antiguas", onPress: () => setSort("oldest") },
      { text: "Por prioridad", onPress: () => setSort("priority") },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const showPriorityMenu = () => {
    Alert.alert(
      "Seleccionar prioridad",
      "Elige la prioridad para la nueva misión",
      [
        { text: "Alta", onPress: () => setNewTodoPriority("high") },
        { text: "Media", onPress: () => setNewTodoPriority("medium") },
        { text: "Baja", onPress: () => setNewTodoPriority("low") },
        { text: "Cancelar", style: "cancel" },
      ],
    );
  };

  const getPriorityColor = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "high":
        return colors.red;
      case "medium":
        return colors.yellow;
      case "low":
        return colors.green;
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sort === "newest") return b.createdAt - a.createdAt;
    if (sort === "oldest") return a.createdAt - b.createdAt;
    if (sort === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const getCompletionStats = () => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percentage };
  };

  const stats = getCompletionStats();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Tus Misiones</Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>
          Gestiona tus tareas y conquista tus objetivos.
        </Text>
      </View>

      <Card style={styles.todoCard}>
        <View style={styles.todoHeader}>
          <View>
            <Text style={[styles.todoTitle, { color: theme.text }]}>
              Lista de Misiones
            </Text>
            <Text style={[styles.todoSubtitle, { color: theme.muted }]}>
              {stats.completed} de {stats.total} misiones completadas (
              {stats.percentage}%)
            </Text>
          </View>

          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={[styles.iconButton, { borderColor: theme.border }]}
              onPress={showFilterMenu}
            >
              <Filter width={16} height={16} color={theme.muted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconButton, { borderColor: theme.border }]}
              onPress={showSortMenu}
            >
              <SortDesc width={16} height={16} color={theme.muted} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[
                styles.input,
                {
                  color: theme.text,
                  borderColor: theme.border,
                  backgroundColor: isDark ? theme.card : theme.background,
                },
              ]}
              placeholder="Añadir nueva misión..."
              placeholderTextColor={theme.muted}
              value={newTodo}
              onChangeText={setNewTodo}
              onSubmitEditing={addTodo}
            />

            <TouchableOpacity
              style={[
                styles.priorityButton,
                { backgroundColor: `${getPriorityColor(newTodoPriority)}20` },
              ]}
              onPress={showPriorityMenu}
            >
              <View
                style={[
                  styles.priorityDot,
                  { backgroundColor: getPriorityColor(newTodoPriority) },
                ]}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={addTodo}
          >
            <PlusCircle width={20} height={20} color="#fff" />
            <Text style={styles.addButtonText}>Añadir</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={[styles.todoList, { borderColor: theme.border }]}>
          {sortedTodos.length > 0 ? (
            sortedTodos.map((todo) => (
              <View
                key={todo.id}
                style={[
                  styles.todoItem,
                  {
                    backgroundColor: todo.completed
                      ? `${theme.muted}10`
                      : "transparent",
                    borderBottomColor: theme.border,
                  },
                ]}
              >
                <Checkbox
                  checked={todo.completed}
                  onToggle={() => toggleTodo(todo.id)}
                />

                <View style={styles.todoContent}>
                  <View style={styles.todoTextContainer}>
                    <View
                      style={[
                        styles.priorityIndicator,
                        { backgroundColor: getPriorityColor(todo.priority) },
                      ]}
                    />
                    <Text
                      style={[
                        styles.todoText,
                        {
                          color: theme.text,
                          textDecorationLine: todo.completed
                            ? "line-through"
                            : "none",
                          opacity: todo.completed ? 0.6 : 1,
                        },
                      ]}
                    >
                      {todo.text}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteTodo(todo.id)}
                  >
                    <Trash2 width={16} height={16} color={theme.muted} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: theme.muted }]}>
                {filter !== "all"
                  ? `No hay misiones ${filter === "active" ? "activas" : "completadas"}.`
                  : "¡Añade una nueva misión para comenzar tu aventura!"}
              </Text>

              {filter !== "all" && (
                <TouchableOpacity
                  style={[styles.emptyButton, { borderColor: theme.border }]}
                  onPress={() => setFilter("all")}
                >
                  <Text style={[styles.emptyButtonText, { color: theme.text }]}>
                    Ver todas las misiones
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  todoCard: {
    flex: 1,
  },
  todoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  todoSubtitle: {
    fontSize: 14,
  },
  headerButtons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
  },
  priorityButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 4,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "500",
    marginLeft: 8,
  },
  todoList: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
  },
  todoContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 12,
  },
  todoTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  todoText: {
    fontSize: 16,
  },
  deleteButton: {
    padding: 8,
  },
  emptyState: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    marginBottom: 16,
  },
  emptyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  emptyButtonText: {
    fontWeight: "500",
  },
});
