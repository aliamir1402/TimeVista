import React, { useState } from "react";
import Auth from "./Auth";
import LogoTV from "../components/images/logo.png";
import userpic from "../components/images/username.svg";
import passwordpic from "../components/images/password.svg";
import emailpic from "../components/images/id_card.svg";
import usernamepic from "../components/images/mail.svg";
import showeye from "../components/images/visibility.svg";
import noshoweye from "../components/images/visibility_off.svg";

export default function Login() {
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
        document.getElementById("password").value ||
        document.getElementById("ConfirmPassword").value
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DataInsert),
      });

      const responseData = await response.json();
      alert(responseData);
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

          <div class="flex_box border-b-2 border-solid border-gray-300">
            <div className="h-fit m-2 mt-3.5">
              <img src={usernamepic} alt="userpic" width={30} height={30} />
            </div>
            <div className="m-2 flex_item">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
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

          <div className="login-button mt-4">
            <button type="submit" onClick={SignUpFunc}>
              Register
            </button>
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
