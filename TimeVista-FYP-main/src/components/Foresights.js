import React from "react";
import ForesightsImg from "./images/foresights.png";
import TempBullet from "./images/tempBullet.gif";

export default function ForeSights() {
  var foresightData = {
    title: "Foresights",
    point1: "Point 1",
    point2: "Point 2",
    point3: "Point 3",
    point4: "Point 4",
    point5: "Point 5",
  };

  return (
    <>
      <div className="foresightsBox">
        <div className="foresights1BoxSec1 flex">
          <div>
            <img className="foresights1Boxsec3" src={ForesightsImg} alt="" />
          </div>
          <div className="txtInsights">{foresightData.title.toUpperCase()}</div>
        </div>
        <div className="foresights1BoxSec2">
          <ul>
            <div className="flex">
              <img
                className="picBullet mr-2 rounded-full"
                src={TempBullet}
                alt="TempBullet"
              />
              <li className="mb-2">{foresightData.point1}</li>
            </div>
            <hr />
            <div className="flex">
              <img
                className="picBullet mr-2 rounded-full"
                src={TempBullet}
                alt="TempBullet"
              />
              <li className="mb-2">{foresightData.point2}</li>
            </div>
            <hr />
            <div className="flex">
              <img
                className="picBullet mr-2 rounded-full"
                src={TempBullet}
                alt="TempBullet"
              />
              <li className="mb-2">{foresightData.point3}</li>
            </div>
            <hr />
            <div className="flex">
              <img
                className="picBullet mr-2 rounded-full"
                src={TempBullet}
                alt="TempBullet"
              />
              <li className="mb-2">{foresightData.point4}</li>
            </div>
            <hr />
            <div className="flex">
              <img
                className="picBullet mr-2 rounded-full"
                src={TempBullet}
                alt="TempBullet"
              />
              <li className="mb-2">{foresightData.point5}</li>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
