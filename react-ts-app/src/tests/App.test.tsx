import { render, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App, { GET_USERS } from "../App";

const mocks = [
  {
    request: {
      query: GET_USERS,
    },
    result: {
      data: {
        people: [
          {
            email: "lillian.banks@example.com",
            name: {
              title: "Mrs",
              first: "Lillian ",
              last: "Banks",
            },
            picture: {
              large: "https://randomuser.me/api/portraits/women/27.jpg",
            },
          },
        ],
      },
    },
  },
];
describe("<App/>", () => {
  it("App rendered AND GET_USERS Request is working", () => {
    const app = render(
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    );
    expect(app).toMatchSnapshot();
  });
});
