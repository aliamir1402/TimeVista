import React from "react";
import { Link } from "react-router-dom";
import DropDownMenu from "./DropDownMenu.js";
import helpIcon from "./images/help.png";
import ppic from "./images/profilepic.png";
import SearchIcon from "./images/search.png";
import ThemeChange from "./themechange.js";
import logo from "./images/logo.png";
import Notifications from "./Notifications.js";

export default function header() {
  var name = "Ali";
  return (
    <>
      <nav className="flex_box p-4 pr-0 pt-1 pb-1 head bor">
        <div className="space flex">
          <Link to="/">
            <div className="flex items-center flex-shrink-0 bor">
              <img className="h-16 w-16" src={logo} alt="TimeVista" />
              <div className="title bor">
                <p>
                  <span className="title-half">T</span>ime
                  <span className="title-half">V</span>ista
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex bor">
          <button>
            <img src={SearchIcon} alt="Profile Pic" className="commonicon" />
          </button>
          <Notifications></Notifications>
          <button>
            <img src={helpIcon} alt="Profile Pic" className="commonicon" />
          </button>
        </div>
        <div className="divider flex"></div>
        <div className="flex bor">
          <div className="mr-2 mt-3.5">
            <img src={ppic} alt="Profile Pic" className="ppic" />
          </div>
          <div className="mr-2 mt-2.5">
            <DropDownMenu profileName={name}></DropDownMenu>
          </div>
        </div>
      </nav>
    </>
  );
}
