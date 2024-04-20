import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DropDownMenu from "./DropDownMenu.js";
import helpIcon from "./images/help.png";
import ppic from "./images/profilepic.png";
import SearchIcon from "./images/search.png";
import ThemeChange from "./themechange.js";
import logo from "./images/logo.png";
import Notifications from "./Notifications.js";

export default function Header() {
  var name = "",
    flag;

  useEffect(() => {
    // Example usage
    const itemName = "username"; // Replace with the name of the item you want to check
    const exists = isLocalStorageItemExists(itemName);

    if (!exists) redirectToLink("/../login", 500);
  }, []);

  var redirectToLink = (url, delay) => {
    setTimeout(function () {
      window.location.href = url;
    }, delay);
  };
  // Check if an item exists in local storage
  function isLocalStorageItemExists(key) {
    return localStorage.getItem(key) !== null;
  }

  // Example usage
  const itemName = "username"; // Replace with the name of the item you want to check
  const exists = isLocalStorageItemExists(itemName);

  if (exists) {
    flag = 1;
    name = localStorage.getItem(itemName);
  } else {
    flag = 0;
  }

  return (
    <>
      <nav className="flex_box head bor">
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
        <div className="bor w-fit pt-6 flex_item">
          <a href="/../" className="wavy-underline nav-effects">
            Home
          </a>
          <a href="#" className="wavy-underline nav-effects">
            Products
          </a>
          <a href="/../aboutus" className="wavy-underline nav-effects">
            About
          </a>
          <a href="/../articles" className="wavy-underline nav-effects">
            Articles
          </a>
          <a href="/../contact" className="wavy-underline nav-effects">
            Contact Us
          </a>
          <a href="#" className="wavy-underline nav-effects">
            FAQs
          </a>
          <a href="#" className="wavy-underline nav-effects">
            Subscribe
          </a>
        </div>
        <div className="divider flex"></div>
        <div className="flex bor flex_item">
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
