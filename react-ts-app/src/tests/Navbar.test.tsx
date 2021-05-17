import { render } from "@testing-library/react";
import Navbar, { Props } from "../components/Navbar";

const defaultProps: Props = {
  handleSearch() {
    return;
  },
  clearSearch() {
    return;
  },
};

describe("<Navbar/>", () => {
  it("Navbar rendered", () => {
    render(<Navbar {...defaultProps} />);
  });
});
