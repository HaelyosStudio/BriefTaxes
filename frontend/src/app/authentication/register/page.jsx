"use client";
import { useState } from "react";

export default function Register() {
  const [firstname, setFirstName] = useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastname, setLastName] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
  const [address, setAddress] = useState("");
  const [addressErrorMessage, setAddressErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFirstNameErrorMessage("");
    setLastNameErrorMessage("");
    setEmailErrorMessage("");
    setPhoneNumberErrorMessage("");
    setAddressErrorMessage("");
    setPasswordErrorMessage("");
    setConfirmPasswordErrorMessage("");
    setGeneralErrorMessage("");

    if (password !== confirmPassword) {
      setConfirmPasswordErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/ld+json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          phoneNumber,
          address,
          password,
        }),
      });

      if (response.status === 200) {
        setGeneralErrorMessage("Registration successful! Please login.");
      } else {
        const errorData = await response.json();
        setGeneralErrorMessage(
          errorData.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      const errorResponse = error.response ? await error.response.json() : null;

      if (errorResponse) {
        if (errorResponse.errors) {
          errorResponse.errors.forEach((err) => {
            if (err.param === "firstname") {
              setFirstNameErrorMessage(err.msg);
            } else if (err.param === "lastname") {
              setLastNameErrorMessage(err.msg);
            } else if (err.param === "email") {
              setEmailErrorMessage(err.msg);
            } else if (err.param === "phoneNumber") {
              setPhoneNumberErrorMessage(err.msg);
            } else if (err.param === "address") {
              setAddressErrorMessage(err.msg);
            } else if (err.param === "password") {
              setPasswordErrorMessage(err.msg);
            }
          });
        } else {
          setGeneralErrorMessage(
            errorResponse.message || "An error occurred. Please try again."
          );
        }
      } else {
        setGeneralErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <form className="registerFormMainContainer" onSubmit={handleSubmit}>
      <h1 className="registerFormTitle">Register</h1>
      <div className="registerFormContainer outerShadow">
        <div className="registerFieldBox">
          <label className="registerFirstNameLabel" htmlFor="firstname">
            First Name
          </label>
          <input
            className="registerField innerShadow"
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {firstNameErrorMessage && (
            <p className="errorMessage">{firstNameErrorMessage}</p>
          )}
        </div>

        <div className="registerFieldBox">
          <label className="registerLastNameLabel" htmlFor="lastname">
            Last Name
          </label>
          <input
            className="registerField innerShadow"
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {lastNameErrorMessage && (
            <p className="errorMessage">{lastNameErrorMessage}</p>
          )}
        </div>

        <div className="registerFieldBox">
          <label className="registerEmailLabel" htmlFor="email">
            Email
          </label>
          <input
            className="registerField innerShadow"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailErrorMessage && (
            <p className="errorMessage">{emailErrorMessage}</p>
          )}
        </div>

        <div className="registerFieldBox">
          <label className="registerPhoneNumberLabel" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            className="registerField innerShadow"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          {phoneNumberErrorMessage && (
            <p className="errorMessage">{phoneNumberErrorMessage}</p>
          )}
        </div>

        <div className="registerFieldBox">
          <label className="registerAddressLabel" htmlFor="address">
            Address
          </label>
          <input
            className="registerField innerShadow"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {addressErrorMessage && (
            <p className="errorMessage">{addressErrorMessage}</p>
          )}
        </div>

        <div className="registerFieldBox">
          <label className="registerPasswordLabel" htmlFor="password">
            Password
          </label>
          <input
            className="registerField innerShadow"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordErrorMessage && (
            <p className="errorMessage">{passwordErrorMessage}</p>
          )}
        </div>

        <div className="registerFieldBox">
          <label
            className="registerConfirmPasswordLabel"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="registerField innerShadow"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {confirmPasswordErrorMessage && (
            <p className="errorMessage">{confirmPasswordErrorMessage}</p>
          )}
        </div>

        {generalErrorMessage && (
          <p className="errorMessage">{generalErrorMessage}</p>
        )}

        <button className="registerSubmitButton" type="submit">
          Register
        </button>
      </div>
    </form>
  );
}
