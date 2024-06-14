"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Navbar() {

  
  const [IsTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      const isTokenExpired = (token) => {
        if (!token) return true;
        const decodedToken = jwtDecode(token);
        return decodedToken.exp * 1000 < new Date().getTime();
      };
      setIsTokenValid(token && !isTokenExpired(token));
    };

    checkToken();
    window.addEventListener("token", checkToken);
    return () => {
      window.removeEventListener("token", checkToken);
    };
  }, []);

  return (
    <div className="mainHeaderContainer">
      <img
        className="headerBackgroundImage"
        src="../images/background.png"
        alt="Background image"
      />
      <div className="navBarMainContainer">
        <div className="navBarLeftBox">
          <span className="profilePicture"></span>
          {IsTokenValid ? <p> WELCOME </p> : <p> Disconnected</p>}
        </div>
        <div className="navBarRightBox outerShadow">
          <Link href="/" className="navOptions">
            <FontAwesomeIcon
              className="icons"
              icon="fa-solid fa-house-chimney"
            />
            <span className="navOptionsText">Home</span>
          </Link>
          <Link href="/" className="navOptions">
            <FontAwesomeIcon className="icons" icon="fa-solid fa-money-bills" />
            <span className="navOptionsText">Payment</span>
          </Link>
          <Link href="/" className="navOptions">
            <FontAwesomeIcon className="icons" icon="fa-solid fa-id-card" />
            <span className="navOptionsText">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
