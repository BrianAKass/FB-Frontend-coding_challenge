import { render } from "@testing-library/react";
import UserField, { Props } from "../components/UserField";
import { testPeople } from "./Testpeople";

const defaultProps = {
  title: "Mr",
  first: "Test",
  last: "123",
  picture: "test.jpg",
  email: "test@test.com",
  handleOpen() {
    return;
  },
  handleModal() {
    return;
  },
};

describe("<UserField/>", () => {
  it("UserField rendered", () => {
    const userField = render(<UserField {...defaultProps} />);
    expect(userField).toMatchSnapshot();
  });
});
