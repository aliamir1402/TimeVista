import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../components/images/logo.png";
import sun from "./images/sun.png";
import moon from "./images/moon.png";

export default function Navbar(props) {
  var [im_theme, setim_theme] = useState("sun-logo");
  var [im_name, setim_name] = useState(props.sun);
  var flag = 0;
  var name = "";

  function revertThemeFunc() {
    const body = document.body;
    console.log("Clicked!");
    if (body.style.color === "rgb(37, 37, 37)") {
      body.style.backgroundColor = "#272727";
      body.style.color = "white";
      setim_name(props.moon);
    } else {
      body.style.backgroundColor = "white";
      body.style.color = "rgb(37, 37, 37)";
      setim_name(props.sun);
    }
  }

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

  if (flag) {
    return (
      <>
        <div className="ml-4 p-2 main-nav-inline flex_box">
          <div className=" in-line m-2 flex_item">
            <div className="">
              <img class="logo-im" src={logo} alt="Time Vista Logo" />
            </div>
            <div className=" title">
              <span className="title-half">T</span>ime
              <span className="title-half">V</span>ista
            </div>
          </div>

          <div className="navs flex_item">
            <a href="#" className="wavy-underline nav-effects">
              Home
            </a>
            <a href="#" className="wavy-underline nav-effects">
              Products
            </a>
            <a href="#" className="wavy-underline nav-effects">
              About
            </a>
            <a href="#" className="wavy-underline nav-effects">
              Articles
            </a>
            <a href="#" className="wavy-underline nav-effects">
              Contact Us
            </a>
            <a href="#" className="wavy-underline nav-effects">
              FAQs
            </a>
            <a href="#" className="wavy-underline nav-effects">
              Subscribe
            </a>
          </div>

          <div className="flex_item">
            <Link to="/profile">
              <button
                type="button"
                class="text-white bg-gradient-to-br from-green-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-7 py-2.5 text-center mr-2 mb-2 mt-5"
              >
                {name}
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="ml-4 p-2 main-nav-inline flex_box">
          <div className=" in-line m-2 flex_item">
            <div className="">
              <img class="logo-im" src={logo} alt="Time Vista Logo" />
            </div>
            <div className=" title">
              <span className="title-half">T</span>ime
              <span className="title-half">V</span>ista
            </div>
          </div>

          <div className="navs flex_item">
            <a href="#" className="wavy-underline nav-effects">
              Home
            </a>
            <a href="#" className="wavy-underline nav-effects">
              Products
            </a>
            <a href="#" className="wavy-underline nav-effects">
              About
            </a>
            <a href="#" className="wavy-underline nav-effects">
              Articles
            </a>
            <a href="#" className="wavy-underline nav-effects">
              Contact Us
            </a>
            <a href="#" className="wavy-underline nav-effects">
              FAQs
            </a>
            <a href="#" className="wavy-underline nav-effects">
              Subscribe
            </a>
          </div>

          <div className="flex_item ml-10">
            <Link to="/login">
              <button
                type="button"
                class="text-white-700 hover:text-white der der-white-700 hover:bg-neutral-100 hover:bg-opacity-10 focus:der-primary-accent-100 focus:outline-none focus:ring-0 active:der-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-full text-sm px-7 py-2.5 text-center mr-2 mb-2 mt-5 dark:der-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
              >
                Login
              </button>
            </Link>
          </div>
          <div className="flex_item">
            <Link to="/sign-up">
              <button
                type="button"
                class="text-white bg-gradient-to-br from-green-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-7 py-2.5 text-center mr-2 mb-2 mt-5"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
