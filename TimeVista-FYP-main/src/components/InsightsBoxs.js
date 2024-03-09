import React from "react";
import insightsImg from "./images/insights.png";
import TempBullet from "./images/tempBullet.gif";

export default function InsightsBoxs() {
  var insight1 = {
    title: "  Insights",
    point1: "Point 1",
    point2: "Point 2",
    point3: "Point 3",
    point4: "Point 4",
    point5: "Point 5",
  };
  return (
    <>
      <div className="insightsBox">
        <div className="insights1BoxSec1 flex">
          <div>
            <img className="insights1Boxsec3" src={insightsImg} alt="" />
          </div>
          <div className="txtInsights">{insight1.title.toUpperCase()}</div>
        </div>
        <div className="insights1BoxSec2">
          <ul>
            <div className="flex">
              <img
                className="picBullet mr-2 rounded-full"
                src={TempBullet}
                alt="TempBullet"
              />
              <li className="mb-2">{insight1.point1}</li>
            </div>
            <hr />
            <div className="flex">
              <img
                className="picBullet mr-2 rounded-full"
                src={TempBullet}
                alt="TempBullet"
              />
              <li className="mb-2">{insight1.point2}</li>
            </div>
            <hr />
            <div className="flex">
              <img
                className="picBullet mr-2 rounded-full"
                src={TempBullet}
                alt="TempBullet"
              />
              <li className="mb-2">{insight1.point3}</li>
            </div>
            <hr />
            <div className="flex">
              <img
                className="picBullet mr-2 rounded-full"
                src={TempBullet}
                alt="TempBullet"
              />
              <li className="mb-2">{insight1.point4}</li>
            </div>
            <hr />
            <div className="flex">
              <img
                className="picBullet mr-2 rounded-full"
                src={TempBullet}
                alt="TempBullet"
              />
              <li className="mb-2">{insight1.point5}</li>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
