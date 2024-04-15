import React, { useState } from "react";
import Auth from "./Auth";
import LogoTV from "../components/images/logo.png";
import userpic from "../components/images/username.svg";
import passwordpic from "../components/images/password.svg";
import emailpic from "../components/images/id_card.svg";
import usernamepic from "../components/images/mail.svg";
import showeye from "../components/images/visibility.svg";
import noshoweye from "../components/images/visibility_off.svg";

export default function SignUp() {
  const [passwordEye, setPasswordEye] = useState(noshoweye);

  var changeImageShow = () => {
    if (passwordEye === noshoweye) {
      setPasswordEye(showeye);
      document.getElementById("password").type = "text";
      document.getElementById("ConfirmPassword").type = "text";
    } else {
      setPasswordEye(noshoweye);
      document.getElementById("password").type = "password";
      document.getElementById("ConfirmPassword").type = "password";
    }
  };

  const SignUpFunc = async () => {
    var usernameerr = document.getElementById("usernameerr");
    var emailerr = document.getElementById("emailerr");
    var registersuccess = document.getElementById("registersuccess");

    try {
      const DataInsert = {
        name: document.getElementById("FullName").value,
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        age: "",
        mobile: "",
      };

      if (
        !document.getElementById("FullName").value ||
        !document.getElementById("username").value ||
        !document.getElementById("email").value ||
        !document.getElementById("password").value ||
        !document.getElementById("ConfirmPassword").value
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DataInsert),
      });

      const responseData = await response.json();
      if (responseData === 0) {
        emailerr.style.display = "none";
        usernameerr.style.display = "none";
        registersuccess.style.display = "block";
        document.getElementById("FullName").value = "";
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("ConfirmPassword").value = "";
      } else if (responseData === 3) {
        emailerr.style.display = "block";
        usernameerr.style.display = "block";
        registersuccess.style.display = "none";
      } else if (responseData === 1) {
        emailerr.style.display = "block";
        usernameerr.style.display = "none";
        registersuccess.style.display = "none";
      } else if (responseData === 2) {
        usernameerr.style.display = "block";
        emailerr.style.display = "none";
        registersuccess.style.display = "none";
      }
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error sending data. Please try again.");
    }
  };

  return (
    <div className="pt-8 pl-8 pb-8 login-bg">
      <div class="login-container">
        <div class="login-box">
          <div className="p-4 login-image">
            <img src={LogoTV} alt="LoginImage" width={60} height={60} />
            <div className="login-title">SignUp</div>
          </div>
          <div
            id="registersuccess"
            style={{
              color: "white",
              padding: "5px",
              fontSize: "14px",
              textAlign: "center",
              backgroundColor: "#01c26f",
              borderRadius: "12px",
            }}
          >
            Registration Successfull!
          </div>

          <div class="flex_box border-b-2 border-solid border-gray-300">
            <div className="h-fit m-2 mt-3.5">
              <img src={userpic} alt="userpic" width={30} height={30} />
            </div>
            <div className="m-2 flex_item">
              <input
                type="text"
                id="FullName"
                name="FullName"
                placeholder="FullName"
                required
              />
            </div>
          </div>

          <div class="flex_box border-b-2 border-solid border-gray-300">
            <div className="h-fit m-2 mt-3.5">
              <img src={emailpic} alt="userpic" width={30} height={30} />
            </div>
            <div className="m-2 flex_item">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                required
              />
            </div>
          </div>
          <div
            id="usernameerr"
            style={{
              color: "red",
              padding: "5px",
              fontSize: "12px",
              textAlign: "right",
            }}
          >
            Username Already Taken...
          </div>
          <div class="flex_box border-b-2 border-solid border-gray-300">
            <div className="h-fit m-2 mt-3.5">
              <img src={usernamepic} alt="userpic" width={30} height={30} />
            </div>
            <div className="m-2 flex_item">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div
            id="emailerr"
            style={{
              color: "red",
              padding: "5px",
              fontSize: "12px",
              textAlign: "right",
            }}
          >
            Email Already Taken...
          </div>

          <div class="flex_box border-b-2 border-solid border-gray-300">
            <div className="h-fit m-2 mt-3.5">
              <img src={passwordpic} alt="passwordpic" width={30} height={30} />
            </div>
            <div className="m-2 flex_item">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
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

          <div class="flex_box border-b-2 border-solid border-gray-300">
            <div className="h-fit m-2 mt-3.5">
              <img src={passwordpic} alt="passwordpic" width={30} height={30} />
            </div>
            <div className="m-2 flex_item">
              <input
                type="password"
                id="ConfirmPassword"
                name="ConfirmPassword"
                placeholder="Confirm Password"
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

          <div className="login-button mt-4" onClick={SignUpFunc}>
            <button type="submit">Register</button>
          </div>
          <div className="flex_box mt-2">
            <div className="checkbox-group flex_item"></div>
          </div>
          {<Auth></Auth>}
        </div>
        <div className="login-account-title">
          <a href="./login">Already have an account...</a>
        </div>
      </div>
    </div>
  );
}
