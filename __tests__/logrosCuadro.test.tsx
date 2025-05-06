import React from "react";
import { render } from "@testing-library/react-native";
import LogrosCuadro from "../components/logrosCuadro";

// Mock MaterialCommunityIcons
jest.mock("@expo/vector-icons", () => ({
  MaterialCommunityIcons: "MaterialCommunityIcons",
}));

describe("LogrosCuadro Component", () => {
  const defaultProps = {
    title: "Test Achievement",
    objective: "Test Objective",
    completed: false,
  };

  it("renders correctly with default props", () => {
    const { getByText } = render(<LogrosCuadro {...defaultProps} />);
    expect(getByText("Test Achievement")).toBeTruthy();
    expect(getByText("Test Objective")).toBeTruthy();
    expect(getByText("En Progreso")).toBeTruthy();
  });

  it("renders correctly when completed", () => {
    const { getByText } = render(
      <LogrosCuadro {...defaultProps} completed={true} />
    );
    expect(getByText("Test Achievement")).toBeTruthy();
    expect(getByText("Test Objective")).toBeTruthy();
    expect(getByText("Completado")).toBeTruthy();
  });
});
