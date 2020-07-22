import React from "react";
import { render, cleanup } from "@testing-library/react";
import SignUp from "../components/SignUp";
import ReactDOM from "react-dom";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SignUp />, div);
});

it("button is disabled when the form is incomplete", () => {
  const { getByTestId } = render(<SignUp />);
  expect(getByTestId("button")).toBeDisabled();
});

test('It should keep a $ in front of the input', () => {
  const { input } = setup()
  fireEvent.change(input, { target: { value: '23' } })
  expect(input.value).toBe('$23')
}
