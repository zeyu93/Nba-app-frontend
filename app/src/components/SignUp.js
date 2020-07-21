import React from "react";
import "../styles/Signup.scss";
import axios from "axios";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      agreed: false
    };
  }

  isValidPasssWord = string => {
    // at least 8 character & one number
    const regex = /[0-9]/g;
    let doesStringContainNumber = regex.test(string);
    return doesStringContainNumber && string.length >= 8;
  };

  validateFields = () => {
    const { firstName, lastName, email, password, agreed } = this.state;
    return (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      this.isValidPasssWord(password) &&
      agreed
    );
  };

  onSubmit = e => {
    e.preventDefault();
    // send information to the server via post request
    const { firstName, lastName, email, password } = this.state;
    const axiosBody = {
      firstName,
      lastName,
      email,
      password
    };

    //sends the state to the server for storing in database
    //nodeJs server can be located in the server directory
    axios
      .post("/user", axiosBody)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const { firstName, lastName, email, password, agreed } = this.state;

    return (
      <div className="sign-up-page">
        <div className="sign-up-page__left"></div>
        <div className="sign-up-page__right">
          <div className="sign-up-page__right--container">
            <h1>Start saving today!</h1>
            <div className="sign-up-page__right--row">
              <div className="sign-up-page__right--row--name">
                <span>First Name:</span>
                <input
                  className="sign-up-page__input"
                  type="text"
                  // value={this.state.value}
                  // onChange={this.handleChange}
                />
              </div>

              <div className="sign-up-page__right--row--name">
                <span>Last Name:</span>
                <input
                  type="text"
                  className="sign-up-page__input"
                  // value={this.state.value}
                  // onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="sign-up-page__right--row">
              <label>
                Email:
                <input
                  type="email"
                  className="sign-up-page__input"
                  // value={this.state.value}
                  // onChange={this.handleChange}
                />
              </label>
            </div>
            <div className="sign-up-page__right--row">
              <label>
                Create a password:
                <input
                  type="password"
                  className="sign-up-page__input"
                  // value={this.state.value}
                  // onChange={this.handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" />
                <span>Agree to the Terms & Privacy policy</span>
              </label>
            </div>
            <div
              className="sign-up-page__right--submit"
              onClick={this.onSubmit}
            >
              <span>CREATE AN ACCOUNT</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
