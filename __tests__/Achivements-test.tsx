import renderer from "react-test-renderer";
import Achivements from "../app/(tabs)/Achievements";

jest.mock("../context/ThemeContext");

it("renders Achivements component", () => {
  const tree = renderer.create(<Achivements />).toJSON();

  expect(tree).toMatchSnapshot();
});
