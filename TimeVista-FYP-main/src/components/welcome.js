import React from "react";
import waveHand from "./images/Whand.png";

export default function Welcome() {
  var name = "Ali Amir Khawaja";
  return (
    <>
      <div className="welcome-box divvBox">
        <div className="flex">
          <h1 className="mt-1.5">
            <span className="txt-welcome">Hi, {name.toUpperCase()}</span>
            <hr />
            <span className="text-sm">Choose the one that suits you best!</span>
          </h1>
          <img className="img-welcome" src={waveHand} alt="handwave" />
        </div>
      </div>
    </>
  );
}
