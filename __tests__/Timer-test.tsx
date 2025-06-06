import renderer from "react-test-renderer";
import Timer from "../app/(tabs)/Timer";

jest.mock("../context/ThemeContext");
jest.useFakeTimers();

it("renders Timer component", async () => {
  const tree = await renderer.create(<Timer />).toJSON();

  expect(tree).toMatchSnapshot();
});
