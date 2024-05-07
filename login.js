import React, { useEffect, useState } from "react";
import LoginImage from "../components/images/icons8-irrigation-96.png";
import Auth from "./Auth";
import LogoTV from "../components/images/logo.png";
import userpic from "../components/images/username.svg";
import passwordpic from "../components/images/password.svg";
import showeye from "../components/images/visibility.svg";
import noshoweye from "../components/images/visibility_off.svg";

export default function Login() {
  const [passwordEye, setPasswordEye] = useState(noshoweye);

  // Check if an item exists in local storage
  function isLocalStorageItemExists(key) {
    return localStorage.getItem(key) !== null;
  }
  useEffect(() => {
    // Example usage
    const itemName = "username"; // Replace with the name of the item you want to check
    const exists = isLocalStorageItemExists(itemName);

    if (exists) redirectToLink("/../dashboard", 500);
  }, []);

  var changeImageShow = () => {
    if (passwordEye === noshoweye) {
      setPasswordEye(showeye);
      document.getElementById("password").type = "text";
    } else {
      setPasswordEye(noshoweye);
      document.getElementById("password").type = "password";
    }
  };

  var redirectToLink = (url, delay) => {
    setTimeout(function () {
      window.location.href = url;
    }, delay);
  };

  // Function to generate a random token
  function generateToken(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
    return token;
  }

  // Function to generate a random ID
  function generateId(length) {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
    return id;
  }

  // Example usage
  const token = generateToken(16); // Generate a 16-character token
  const id = generateId(8); // Generate an 8-character ID

  console.log("Generated Token:", token);
  console.log("Generated ID:", id);

  const LoginFunc = async () => {
    var loginsuccess = document.getElementById("loginsuccess");
    var loginerror = document.getElementById("loginerror");

    try {
      const DataInsert = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      };

      if (
        !document.getElementById("username").value ||
        !document.getElementById("password").value
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      const response = await fetch(
        "http://localhost:4000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(DataInsert),
        }
      );

      var userId, token, expirationTime;

      const responseData = await response.json();
      if (responseData[0] === 0) {
        const expirationTime = Date.now() + 259200 * 1000; // Convert expiresIn to milliseconds and add to current time
        userId = generateToken(responseData[1].length);
        token = generateId(responseData[1].length);
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        loginsuccess.style.display = "block";
        loginerror.style.display = "none";
        localStorage.setItem("username", responseData[1]);
        localStorage.setItem("user", responseData[2]);
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiration", expirationTime);
        redirectToLink("/../dashboard", 3000);
      } else if (responseData[0] === 1) {
        loginsuccess.style.display = "none";
        loginsuccess.style.display = "none";
        loginerror.style.display = "block";
      }
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error sending data. Please try again.");
    }
  };

  return (
    <div className="login-bg" style={{ padding: "10vw", paddingLeft: "5vw" }}>
      <div class="login-container anamation">
        <div class="login-box">
          <div className="p-4 login-image">
            <img src={LogoTV} alt="LoginImage" width={60} height={60} />
            <div className="login-title">Login</div>
          </div>

          <div
            id="loginsuccess"
            style={{
              color: "white",
              padding: "5px",
              fontSize: "14px",
              textAlign: "center",
              backgroundColor: "#01c26f",
              borderRadius: "12px",
              boxShadow: "0px 0px 5px 1px rgb(199, 199, 199)",
            }}
          >
            <span
              style={{ fontSize: "20px", color: "black", fontWeight: "600" }}
            >
              Login Successful
            </span>
            <br />
            Redirecting to Dashboard...Please Wait
          </div>

          <div
            id="loginerror"
            style={{
              color: "white",
              padding: "5px",
              fontSize: "14px",
              textAlign: "center",
              backgroundColor: "#ff0200",
              borderRadius: "12px",
              boxShadow: "0px 0px 5px 1px rgb(199, 199, 199)",
            }}
          >
            <span
              style={{ fontSize: "20px", color: "white", fontWeight: "600" }}
            >
              Invalid Credentials
            </span>
          </div>

          <div class="flex_box border-b-2 border-solid border-gray-300">
            <div className="h-fit m-2 mt-3.5">
              <img src={userpic} alt="userpic" width={30} height={30} />
            </div>

            <div className="m-2 flex_item">
              <input
                style={{ border: "3px solid #e9e9e9", borderRadius: "12px" }}
                type="text"
                id="username"
                name="username"
                placeholder="Type your username"
                required
              />
            </div>
          </div>

          <div class="flex_box border-b-2 border-solid border-gray-300">
            <div className="h-fit m-2 mt-3.5">
              <img src={passwordpic} alt="passwordpic" width={30} height={30} />
            </div>
            <div className="m-2 flex_item">
              <input
                style={{ border: "3px solid #e9e9e9", borderRadius: "12px" }}
                type="password"
                id="password"
                name="password"
                placeholder="Type your password"
                required
              />
            </div>

            <div className="m-3 mb-0">
              <button
                class="rounded-full hover:bg-gray-200 p-2"
                onClick={changeImageShow}
              >
                <img src={passwordEye} alt="" width={25} height={25} />
              </button>
            </div>
          </div>

          <div className="login-button mt-4" onClick={LoginFunc}>
            <button type="submit">Login</button>
          </div>

          <div className="flex_box mt-4">
            <div className="checkbox-group flex_item"></div>
            <div className="text-right flex_item">
              <a className="forgot-password" href="#">
                Forgot Password?
              </a>
            </div>
          </div>
        </div>
        <div className="login-account-title">
          <a href="./sign-up">Don't have an account...</a>
        </div>
      </div>
    </div>
  );
}
