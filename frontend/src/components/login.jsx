"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setGeneralErrorMessage("");

    if (!isValidEmail(emailValue)) {
      setEmailErrorMessage("Please enter a valid email address.");
    } else {
      setEmailErrorMessage("");
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setGeneralErrorMessage("");

    if (passwordValue.length < 6) {
      setPasswordErrorMessage("Password must be at least 6 characters long.");
    } else {
      setPasswordErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login_check", {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const token = data.token;
        if (token) {
          setTimeout(() => {
            localStorage.setItem("token", token);
            router.push("/dashboard");
          }, 1500);
        } 
      } else {
        const errorData = await response.json();
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
            errorData.message || "Wrong email or password. Please try again."
          );
        }
      } else {
        setSuccessMessage("Login successful. Redirection in a few seconds.");
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
            value={username}
            onChange={handleEmailChange}
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
            onChange={handlePasswordChange}
            required
          />
          {passwordErrorMessage && (
            <p className="errorMessage">{passwordErrorMessage}</p>
          )}
        </div>

        {successMessage && <p className="successMessage">{successMessage}</p>}
        {generalErrorMessage && <p className="errorMessage">{generalErrorMessage}</p>}

        <button className="loginSubmitButton" type="submit">
          Login
        </button>
      </div>
    </form>
  );
}
