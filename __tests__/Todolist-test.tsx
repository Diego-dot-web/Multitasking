import TodoList from "../app/(tabs)/TodoList";
import renderer from "react-test-renderer";

jest.mock("../context/ThemeContext");
// const ThemeContext = require("../context/ThemeContext");
//
// ThemeContext.useTheme = jest.fn(() => {
//   return { isDark: true };
// });

it("renders TodoList component", async () => {
  const tree = await renderer.create(<TodoList />).toJSON();

  expect(tree).toMatchSnapshot();
});
