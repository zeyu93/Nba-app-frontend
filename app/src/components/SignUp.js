// @flow
import * as React from "react";
import "../styles/Signup.scss";
import axios from "axios";
import PasswordValidation from "./PasswordValidation";
type Props = {
  /* ... */
};

type State = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  agreed: boolean,
  passwordFocused: boolean
};
export default class SignUp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      agreed: false,
      passwordFocused: false
    };
  }

  //helper function that can be passed down as prop
  containsOneNumber = (string: string): boolean => {
    const regex = /[0-9]/g;
    return regex.test(string);
  };

  // at least 8 character & one number
  isValidPasssWord = (string: string) => {
    let doesStringContainNumber = this.containsOneNumber(string);
    return doesStringContainNumber && string.length >= 8;
  };

  //all fields must not be empty, and password is valid
  validateFields = (): boolean => {
    const { firstName, lastName, email, password, agreed } = this.state;
    return (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      this.isValidPasssWord(password) &&
      agreed
    );
  };

  // send information to the server via post request, can be async depending on what we need to do after this step
  onSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    const axiosBody = {
      firstName,
      lastName,
      email,
      password
    };

    console.log(axiosBody);

    //sends the state to the server for storing in database
    //nodeJs server can be located in the server directory
    axios
      .post("/user", axiosBody)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        console.log("local server is not running for simplicity sake");
      });
  };

  handleChange = (e: SyntheticInputEvent<HTMLInputElement>, field: string) => {
    const {
      target: { value }
    } = e;
    this.setState({ [field]: value });
  };

  toggleAgreement = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState(prevState => ({
      agreed: !prevState.agreed
    }));
  };

  onFocus = () => {
    this.setState({ passwordFocused: true });
  };

  onBlur = () => {
    this.setState({ passwordFocused: false });
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      agreed,
      passwordFocused
    } = this.state;
    const buttonEnabled = this.validateFields();
    return (
      <div className="sign-up-page">
        <div className="sign-up-page__left"></div>
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
                  onChange={e => this.handleChange(e, "firstName")}
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
                  onChange={e => this.handleChange(e, "lastName")}
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
                onChange={e => this.handleChange(e, "email")}
              />
            </div>

            <div className="sign-up-page__right--row">
              <span> Create a password:</span>
              <input
                data-testid="password"
                type="password"
                className="sign-up-page__input"
                value={password}
                onChange={e => this.handleChange(e, "password")}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />
              <PasswordValidation
                length={password.length}
                containsNumber={this.containsOneNumber(password)}
                passwordFocused={passwordFocused}
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
                    onChange={this.toggleAgreement}
                  />
                  <span>Agree to the Terms & Privacy policy</span>
                </label>
              </div>

              <button
                data-testid="button"
                className="sign-up-page__right--submit"
                onClick={this.onSubmit}
                disabled={!buttonEnabled}
              >
                <span>CREATE AN ACCOUNT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
