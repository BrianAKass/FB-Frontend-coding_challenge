import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Modal, { Props, EDIT_PERSON } from "../components/Modal";
import { testPeople } from "./Testpeople";

const defaultProps: Props = {
  title: testPeople[0].name.title,
  first: testPeople[0].name.first,
  last: testPeople[0].name.last,
  email: testPeople[0].email,
  handleOpen() {
    return;
  },
};
const mocks = [
  {
    request: {
      query: EDIT_PERSON,
      variables: {
        email: testPeople[0].email,
        payload: {
          email: testPeople[0].email,
          title: testPeople[0].name.title,
          first: testPeople[0].name.first,
          last: testPeople[0].name.last,
        },
      },
    },
  },
];
describe("<Modal/>", () => {
  it("Modal rendered AND EDIT_USER Mutation is working", () => {
    render(
      <MockedProvider mocks={mocks}>
        <Modal {...defaultProps} />
      </MockedProvider>
    );
  });
});
