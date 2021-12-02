import React from "react";
import { cleanup, render } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import App from "./App";
import fakeBackend from "./helpers/AuthType/fakeBackend";

// test("renders learn react link", () => {
//   const { getByText } = render(<App />)
//   const linkElement = getByText(/learn react/i)
//   expect(linkElement).toBeInTheDocument()
// })

const mock = new MockAdapter(axios, { onNoMatch: "throwException" });

beforeAll(() => {
  mock.reset();
});

const renderComponent = () => render(<App />);


fakeBackend()

describe("axios mocking test", () => {

  it("axios request login should be success", () =>  axios.post("/post-fake-login", {
      email: "admin@themesbrand.com",
      password: "123456",
    }).then(res => {
      expect(JSON.stringify(res.data)).toBe(JSON.stringify({
        uid: 1,
        username: "admin",
        role: "admin",
        password: "123456",
        email: "admin@themesbrand.com",
      }))
    }));

  it("axios request login should be unsuccessful", () =>  axios.post("/post-fake-login", {
    email: "admin@themesbrand.com",
    password: "1234567",
  })
    .catch(e => {
      expect(JSON.stringify(e)).toBe(JSON.stringify([
        "Username and password are invalid. Please enter correct username and password",
      ]))
    })
  );
});

afterEach(cleanup);
