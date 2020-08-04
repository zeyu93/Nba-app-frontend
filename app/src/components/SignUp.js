// @flow
import React, { useEffect, useState } from "react";
import "../styles/Signup.scss";
import axios from "axios";
import PasswordValidation from "./PasswordValidation";
import { Modal } from "antd";
import "antd/dist/antd.css";

const SignUp = () => {
  const [form, changeForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreed: false
  });

  const [showModal, toggleModal] = useState(false);
  const [isPasswordFocused, setPassWordFocused] = useState(false);

  //helper function that can be passed down as prop
  const containsOneNumber = (string: string): boolean => {
    const regex = /[0-9]/g;
    return regex.test(string);
  };

  // at least 8 character & one number
  const isValidPasssWord = (string: string) => {
    let doesStringContainNumber = containsOneNumber(string);
    return doesStringContainNumber && string.length >= 8;
  };

  const handleModal = () => {
    toggleModal(prevState => !prevState);
  };

  //all fields must not be empty, and password is valid
  const validateFields = (): boolean => {
    const { firstName, lastName, email, password, agreed } = form;
    return (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      isValidPasssWord(password) &&
      agreed
    );
  };

  // send information to the server via post request, can be async depending on what we need to do after this step
  const onSubmit = async (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = form;
    const axiosBody = {
      firstName,
      lastName,
      email,
      password
    };

    //sends the state to the server for storing in database
    //nodeJs server can be located in the server directory
    try {
      console.log(" i am body of request", axiosBody);
      // let response = await axios.post("http://localhost:8080/user", axiosBody);

      handleModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (
    e: SyntheticInputEvent<HTMLInputElement>,
    field: string
  ) => {
    const {
      target: { value, name }
    } = e;
    changeForm({
      ...form,
      [name]: value
    });
  };

  const toggleAgreement = (e: SyntheticInputEvent<HTMLInputElement>) => {
    changeForm({
      ...form,
      agreed: !form.agreed
    });
  };

  const onFocus = () => {
    setPassWordFocused(true);
  };

  const onBlur = () => {
    setPassWordFocused(false);
  };
  const { firstName, lastName, email, password, agreed } = form;
  const buttonEnabled = validateFields();

  return (
    <div className="sign-up-page">
      <div className="sign-up-page__left">
        <h1>All your favourite player's news and stats in one place.</h1>
      </div>

      <Modal
        title="Basic Modal"
        visible={showModal}
        onOk={handleModal}
        onCancel={handleModal}
      >
        <p>App still in progress</p>
      </Modal>

      <div className="sign-up-page__right">
        <div className="sign-up-page__right--container">
          <div className="sign-up-page__right--header">
            <div className="logo" />
            <h1>Start saving today!</h1>
          </div>

          <div className="sign-up-page__right--row sign-up-page__right--row--name">
            <div className="row-container--name">
              <span>First Name:</span>
              <input
                data-testid="firstName"
                className="sign-up-page__input"
                type="text"
                onChange={handleChange}
                name="firstName"
                value={firstName}
              />
            </div>

            <div className="row-container--name">
              <span>Last Name:</span>
              <input
                data-testid="lastName"
                type="text"
                className="sign-up-page__input"
                value={lastName}
                name="lastName"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sign-up-page__right--row">
            <span> Email:</span>
            <input
              data-testid="email"
              type="email"
              className="sign-up-page__input"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="sign-up-page__right--row">
            <span> Create a password:</span>
            <input
              data-testid="password"
              type="password"
              name="password"
              className="sign-up-page__input"
              value={password}
              onChange={handleChange}
              onFocus={onFocus}
              onBlur={onBlur}
            />

            <PasswordValidation
              length={password.length}
              containsNumber={containsOneNumber(password)}
              isPasswordFocused={isPasswordFocused}
            />
          </div>

          <div className="sign-up-page__right--divider" />

          <div className="sign-up-page__right--footer">
            <div>
              <label>
                <input
                  data-testid="agree"
                  type="checkbox"
                  value={agreed}
                  onChange={toggleAgreement}
                />
                <span>Agree to the Terms & Privacy policy</span>
              </label>
            </div>

            <button
              data-testid="button"
              className="sign-up-page__right--submit"
              onClick={onSubmit}
              disabled={!buttonEnabled}
            >
              <span>CREATE AN ACCOUNT</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
