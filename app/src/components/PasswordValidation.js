// @flow
import React from "react";
import "../styles/PasswordValidation.scss";
import cx from "classnames";

type ValidationProps ={
  length: number,
  containsNumber: boolean,
  passwordFocused: boolean
}
export default function PasswordValidation({
  length,
  containsNumber,
  isPasswordFocused
}: ValidationProps) {

  return (
    <div className="password-validation">
      <div
        className={cx("password-validation__container", {
          "password-validation__container--focused": isPasswordFocused,
          "password-validation__symbol--passed":  length >= 8
        })}
      >
        <div
          className={cx("password-validation__symbol", {
            "password-validation__symbol--good": length >= 8
          })}
        />
        <span>At least 8 characters</span>
      </div>

      <div
        className={cx("password-validation__container", {
          "password-validation__container--focused": isPasswordFocused,
          "password-validation__symbol--passed": containsNumber
        })}
      >
        <div
          className={cx("password-validation__symbol", {
            "password-validation__symbol--good": containsNumber
          })}
        />
        <span>One number</span>
      </div>
    </div>
  );
}
