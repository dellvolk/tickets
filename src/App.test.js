import React from "react";
import { cleanup, render } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import App from "./App";
import { fakeBackend } from "./helpers/AuthType/fakeBackend";

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


fakeBackend();

// jest.mock("axios")

describe("axios mocking test", () => {

  let res
  let data
  let error
  let success_login_data
  let fail_login_data

  beforeEach(() => {

    success_login_data = {
      email: "admin@themesbrand.com",
      password: "123456"
    }

    fail_login_data = {
      email: "admin@themesbrand.com",
      password: "error"
    }

    data = {
      uid: 1,
      username: "admin",
      role: "admin",
      password: "123456",
      email: "admin@themesbrand.com"
    }

    res = {
      data
    }
    error = [
      "Username and password are invalid. Please enter correct username and password"
    ]
  })

  // it("axios request login should be called", () => {
  //   axios.get.mockReturnValue(res)
  //
  //   return axios.post("/post-fake-login", success_login_data)
  //     .then(response => {
  //       expect(response.data).toEqual(data)
  //     })
  // });

  it("request login should be success", () => axios.post("/post-fake-login", success_login_data).then(res => {
    expect(JSON.stringify(res.data)).toBe(JSON.stringify(data));
  }));

  it("request login should be unsuccessful", () => axios.post("/post-fake-login", fail_login_data)
    .catch(e => {
      expect(JSON.stringify(e)).toBe(JSON.stringify(error));
    })
  );
});

afterEach(cleanup);
