import React, { useState } from "react";
import Noti from "./images/notifications.png";

export default function Notifications() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  var nortis = {
    nort1: "Sarah Uploaded An Image.",
  };

  return (
    <div className="flex noti">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="relative z-10 block rounded-md focus:outline-none"
        >
          <img src={Noti} alt="Nortificaion Icon" className="commonicon" />
        </button>

        {dropdownOpen && (
          <div
            onClick={closeDropdown}
            className="fixed inset-0 h-full w-full z-10"
          ></div>
        )}

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20"
            style={{ width: "20rem" }}
          >
            <div className="py-2">
              <a
                href="#"
                class="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"
              >
                <img
                  class="h-8 w-8 rounded-full object-cover mx-1"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                  alt="avatar"
                />
                <p class="text-gray-600 text-sm mx-2">
                  <span className="font-bold text-blue-500">
                    {nortis.nort1}
                  </span>
                </p>
              </a>
            </div>
            <div className="block bg-gray-800 text-white text-center font-bold py-2">
              <a href="#">See all notifications</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
