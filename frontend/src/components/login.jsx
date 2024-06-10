"use client";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    setGeneralErrorMessage("");

    try {
      const response = await axios.post("/api/login_check", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        const decoded = jwt_decode(token);
        console.log(decoded);
        window.location.href = "/dashboard";
      } else {
        const errorData = response.data;
        setGeneralErrorMessage(
          errorData.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        if (errorData.errors) {
          errorData.errors.forEach((err) => {
            if (err.param === "email") {
              setEmailErrorMessage(err.msg);
            } else if (err.param === "password") {
              setPasswordErrorMessage(err.msg);
            }
          });
        } else {
          setGeneralErrorMessage(
            errorData.message || "Wrong email. Please try again."
          );
        }
      } else {
        setGeneralErrorMessage("Email or password incorrect. Please try again.");
      }
    }
  };

  return (
    <form className="loginFormMainContainer" onSubmit={handleSubmit}>
      <h1 className="loginFormTitle">Login</h1>
      <div className="loginFormContainer outerShadow">
        <div className="loginEmailBox">
          <label className="loginEmailLabel" htmlFor="email">
            Email
          </label>
          <input
            className="loginField innerShadow"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailErrorMessage && (
            <p className="errorMessage">{emailErrorMessage}</p>
          )}
        </div>

        <div className="loginPasswordBox">
          <label className="loginPasswordLabel" htmlFor="password">
            Password
          </label>
          <input
            className="loginField innerShadow"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordErrorMessage && (
            <p className="errorMessage">{passwordErrorMessage}</p>
          )}
        </div>

        {generalErrorMessage && (
          <p className="errorMessage">{generalErrorMessage}</p>
        )}

        <button className="loginSubmitButton" type="submit">
          Login
        </button>
      </div>
    </form>
  );
}
