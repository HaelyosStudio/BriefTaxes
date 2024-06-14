"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        setTimeout(() => {
          router.push("/login");
        }, 1500);
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
            switch (err.param) {
              case "firstname":
                setFirstNameErrorMessage(err.msg);
                break;
              case "lastname":
                setLastNameErrorMessage(err.msg);
                break;
              case "email":
                setEmailErrorMessage(err.msg);
                break;
              case "phoneNumber":
                setPhoneNumberErrorMessage(err.msg);
                break;
              case "address":
                setAddressErrorMessage(err.msg);
                break;
              case "password":
                setPasswordErrorMessage(err.msg);
                break;
              default:
                setGeneralErrorMessage(
                  errorResponse.message || "An error occurred. Please try again."
                );
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

  const validateName = (name, setErrorMessage, fieldName) => {
    if (name.length < 2) {
      setErrorMessage(`${fieldName} must be at least 2 characters.`);
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const validateEmail = (email, setErrorMessage) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const validatePhoneNumber = (phoneNumber, setErrorMessage) => {
    if (!/^\d{10}$/.test(phoneNumber)) {
      setErrorMessage("Phone number must be 10 digits.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const validatePassword = (password, setErrorMessage) => {
    if (password.length < 6 || password.length > 36) {
      setErrorMessage("Password must be between 6 and 36 characters.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    validateName(value, setFirstNameErrorMessage, "First Name");
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    validateName(value, setLastNameErrorMessage, "Last Name");
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value, setEmailErrorMessage);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    validatePhoneNumber(value, setPhoneNumberErrorMessage);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value, setPasswordErrorMessage);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password !== value) {
      setConfirmPasswordErrorMessage("Passwords do not match");
    } else {
      setConfirmPasswordErrorMessage("");
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
            onChange={handleFirstNameChange}
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
            onChange={handleLastNameChange}
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
            onChange={handleEmailChange}
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
            onChange={handlePhoneNumberChange}
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
            onChange={handlePasswordChange}
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
            onChange={handleConfirmPasswordChange}
            required
          />
          {confirmPasswordErrorMessage && (
            <p className="errorMessage">{confirmPasswordErrorMessage}</p>
          )}
        </div>

        {generalErrorMessage && (
          <p className="errorMessage">{generalErrorMessage}</p>
        )}
        {successMessage && (
          <p className="successMessage">{successMessage}</p>
        )}

        <button className="registerSubmitButton" type="submit">
          Register
        </button>
      </div>
    </form>
  );
}
