import renderer from "react-test-renderer";
import Dashboard from "../app/(tabs)/Dashboard";

jest.mock("../context/ThemeContext");

it("renders Dashboard component", async () => {
  const tree = await renderer.create(<Dashboard />).toJSON();

  expect(tree).toMatchSnapshot();
});
