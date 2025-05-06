import React from "react";
import { render } from "@testing-library/react-native";
import PanelCuadro from "../components/PanelCuadro";

// Mock MaterialCommunityIcons
jest.mock("@expo/vector-icons", () => ({
  MaterialCommunityIcons: "MaterialCommunityIcons",
}));

// Mock Progress
jest.mock("react-native-progress", () => ({
  Bar: "ProgressBar",
}));

describe("PanelCuadro Component", () => {
  const defaultProps = {
    title: "Test Panel",
    value: "100",
    icon: "star",
    barValue: 75,
  };

  it("renders correctly with default props", () => {
    const { getByText } = render(<PanelCuadro {...defaultProps} />);
    expect(getByText("Test Panel")).toBeTruthy();
    expect(getByText("100")).toBeTruthy();
  });

  it("renders with different values", () => {
    const { getByText } = render(
      <PanelCuadro {...defaultProps} value="200" barValue={50} />
    );
    expect(getByText("200")).toBeTruthy();
  });
});
