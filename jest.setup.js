// Mock the environment variables
process.env.EXPO_PUBLIC_API_URL = "http://test-api.com";

// Mock the Colors module
jest.mock("./components/Colors", () => ({
  colors: {
    dark: {
      primary: {
        hex: "#000000",
        foreground: {
          hex: "#ffffff",
        },
      },
      background: {
        hex: "#000000",
      },
      foreground: {
        hex: "#ffffff",
      },
      muted: {
        foreground: {
          hex: "#888888",
        },
      },
      secondary: {
        hex: "#666666",
      },
      warning: {
        hex: "#ffcc00",
      },
      accent: {
        hex: "#ff0000",
        foreground: {
          hex: "#ffffff",
        },
      },
    },
  },
}));
