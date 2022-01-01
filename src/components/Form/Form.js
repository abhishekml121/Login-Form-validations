import React, { useState, useEffect } from "react";
import "./form.css";

const Form = () => {
  const [validEmail, SetValidEmail] = useState(null);
  const [email, SetEmail] = useState("");
  const [validPhoneNumber, SetValidPhoneNumber] = useState(null);
  const [phoneNumber, SetPhoneNumber] = useState("");
  const [passwordColor, SetPasswordColor] = useState("transparent");
  const [ValidPassword, SetValidPassword] = useState(false);
  const [showWelcomeMessage, SetShowWelcomeMessage] = useState(false);

  const isValidEmail = (email) => {
    console.log(email);
    const checkingEmail = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ); // true or false
    return checkingEmail;
  };

  function checkPassword(e) {
    const password = e.target.value;
    let strength = 0;
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
      strength += 1;
    }

    if (password.length > 4 && password.length <= 8 && strength === 4) {
      strength += 1;
    }

    switch (strength) {
      case 0:
        SetPasswordColor("transparent");
        SetValidPassword(false);
        break;

      case 1:
      case 2:
        SetPasswordColor("red");
        SetValidPassword(false);
        break;

      case 3:
      case 4:
        SetPasswordColor("yellow");
        SetValidPassword(false);
        break;

      case 5:
        SetPasswordColor("#15da15");
        SetValidPassword(true);
        break;

      default:
        break;
    }
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const checkingEmail = isValidEmail(email);
    if (checkingEmail) {
      SetValidEmail(true);
    } else {
      SetValidEmail(false);
    }

    if (phoneNumber.length < 10 || phoneNumber.match(/^\d{10}$/) === null) {
      SetValidPhoneNumber(false);
    } else {
      SetValidPhoneNumber(true);
    }

    if (
      validPhoneNumber === true &&
      validEmail === true &&
      ValidPassword === true
    ) {
      SetShowWelcomeMessage(true);
    }
  };
  const PhoneHandler = (e) => {
    const phoneNumber = e.target.value;
    SetPhoneNumber(phoneNumber);
    if (phoneNumber.length === 0) {
      SetValidPhoneNumber(null);
    }
  };

  const emailHandler = (e) => {
    const email = e.target.value;
    SetEmail(email);
    if (email.length === 0) {
      SetValidEmail(null);
    }
  };

  return (
    <>
      {!showWelcomeMessage && (
        <form onSubmit={formSubmitHandler}>
        <header>Login Form</header>
          <div className="email_container">
            <label htmlFor="email">Email</label>
            {/* we can also use type="email" */}
            <input
              type="text"
              id="email"
              value={email}
              onChange={emailHandler}
            />
            {validEmail !== null && validEmail !== true && (
              <div className="error email_error">Email is not valid</div>
            )}
          </div>
          <div className="password_container">
            <label htmlFor="password">Password</label>
            <div className="password-color-wrapper">
              <input
                type="password"
                maxLength="8"
                id="password"
                onChange={checkPassword}
              />
              <div
                className="password_color"
                style={{ backgroundColor: passwordColor }}
              ></div>
            </div>
          </div>
          <div className="phone_container">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              maxLength="10"
              id="phone"
              onChange={PhoneHandler}
            />
            {validPhoneNumber !== null && validPhoneNumber !== true && (
              <div className="error phone_error">
                Phone must have atmost 10 digits only
              </div>
            )}
          </div>

          <div className="submitButtonContainer">
            <input type="submit" value="submit" className="button" />
          </div>
        </form>
      )}

      {showWelcomeMessage && (
        <h1 className="welcome">
          {" "}
          Thank you for sign up. We will get back to you soon!
        </h1>
      )}
    </>
  );
};

export default Form;
