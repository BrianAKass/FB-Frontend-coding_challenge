import { render } from "@testing-library/react";
import Users, { Props } from "../components/Users";
import { testPeople } from "./Testpeople";
const defaultProps: Props = {
  data: testPeople,
  modal: {
    title: "",
    first: "",
    last: "",
    email: "",
  },
  open: false,
  handleOpen() {
    return;
  },
  handleModal() {
    return;
  },
};
describe("<Users/>", () => {
  it("Users rendered", () => {
    render(<Users {...defaultProps} />);
  });
});
