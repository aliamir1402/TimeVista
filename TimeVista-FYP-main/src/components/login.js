import React, { useState } from "react";
import LoginImage from "../components/images/icons8-irrigation-96.png";
import Auth from "./Auth";
import LogoTV from "../components/images/logo.png";
import userpic from "../components/images/username.svg";
import passwordpic from "../components/images/password.svg";
import showeye from "../components/images/visibility.svg";
import noshoweye from "../components/images/visibility_off.svg";

export default function Login() {
  const [passwordEye, setPasswordEye] = useState(noshoweye);

  var changeImageShow = () => {
    if (passwordEye === noshoweye) {
      setPasswordEye(showeye);
      document.getElementById("password").type = "text";
    } else {
      setPasswordEye(noshoweye);
      document.getElementById("password").type = "password";
    }
  };

  return (
    <div className="pt-20 pb-20 pl-8 login-bg">
      <div class="login-container">
        <div class="login-box">
          <div className="p-4 login-image">
            <img src={LogoTV} alt="LoginImage" width={60} height={60} />
            <div className="login-title">Login</div>
          </div>

          <div class="flex_box border-b-2 border-solid border-gray-300">
            <div className="h-fit m-2 mt-3.5">
              <img src={userpic} alt="userpic" width={30} height={30} />
            </div>
            <div className="m-2 flex_item">
              <input
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

          <div className="login-button mt-4">
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
          {<Auth></Auth>}
        </div>
        <div className="login-account-title">
          <a href="./sign-up">Don't have an account...</a>
        </div>
      </div>
    </div>
  );
}
