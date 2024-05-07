import React from "react";
import waveHand from "../components/images/Whand.png";

export default function Welcome(props) {
  // Check if an item exists in local storage
  function isLocalStorageItemExists(key) {
    return localStorage.getItem(key) !== null;
  }
  var name = "",
    flag = 0;
  // Example usage
  const itemName = "username"; // Replace with the name of the item you want to check
  const exists = isLocalStorageItemExists(itemName);

  if (exists) {
    flag = 1;
    name = localStorage.getItem(itemName);
  } else {
    flag = 0;
  }

  if (flag === 1) {
    return (
      <>
        <div className="welcome-box divvBox">
          <div className="flex">
            <h1 className="mt-1.5">
              <span className="txt-welcome">Hi, {name.toUpperCase()}</span>
              <hr />
              <span className="text-sm">
                Choose the one that suits you best!
              </span>
            </h1>
            <img className="img-welcome" src={waveHand} alt="handwave" />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="welcome-box divvBox">
          <div className="flex">
            <h1 className="mt-1.5">
              <span className="txt-welcome">Hi, Default</span>
              <hr />
              <span className="text-sm">
                Choose the one that suits you best!
              </span>
            </h1>
            <img className="img-welcome" src={waveHand} alt="handwave" />
          </div>
        </div>
      </>
    );
  }
}
