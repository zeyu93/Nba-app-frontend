import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
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

test('button is enabled when form is filled', () => {
  const { getByTestId } = render(<SignUp />);
  const firstName = getByTestId('firstName')
  fireEvent.change(firstName, { target: { value: 'john' } })

  const lastName = getByTestId('lastName')
  fireEvent.change(lastName, { target: { value: 'Cena' } })

  const email = getByTestId('email')
  fireEvent.change(email, { target: { value: 'john@gmail.com' } })

  const password = getByTestId('password')
  fireEvent.change(password, { target: { value: 'john12345' } })

  const agreed = getByTestId('agree')
  fireEvent.click(agreed)

  const button = getByTestId('button')

  expect(button).not.toHaveAttribute('disabled')
})
