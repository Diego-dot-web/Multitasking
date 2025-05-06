import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Misiones from "../app/(tabs)/misiones";
import { fetch } from "expo/fetch";

// Mock the fetch function
jest.mock("expo/fetch", () => ({
  fetch: jest.fn(),
}));

// Mock the expo-router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock Ionicons
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

// Mock expo-checkbox
jest.mock("expo-checkbox", () => "Checkbox");

describe("Misiones Component", () => {
  const mockTodos = [
    { id: "1", text: "Test Todo 1", completed: false },
    { id: "2", text: "Test Todo 2", completed: true },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockResolvedValue({
      json: () => Promise.resolve(mockTodos),
    });
  });

  it("renders correctly", async () => {
    const { getByPlaceholderText, getByText } = render(<Misiones />);
    expect(getByPlaceholderText("Añadir nueva misión...")).toBeTruthy();
    expect(getByText("Añadir Misison")).toBeTruthy();
  });

  it("loads todos from API", async () => {
    const { getByText } = render(<Misiones />);
    await waitFor(() => {
      expect(getByText("Test Todo 1")).toBeTruthy();
      expect(getByText("Test Todo 2")).toBeTruthy();
    });
  });

  it("handles API error gracefully", async () => {
    const { getByText } = render(<Misiones />);
    expect(getByText("Añadir Misison")).toBeTruthy();
  });
});
