import React, { useState } from "react";
import sun from "./images/sun.png";
import moon from "./images/moon.png";

export default function Themechange() {
  var count = 0;
  var count_beautifil_txt = 0;
  var insights_count = 0;
  var [im_theme, setim_theme] = useState("commonicon");
  var [im_name, setim_name] = useState(sun);

  const revertThemeFunc = () => {
    const body = document.body;
    const head = document.querySelector(".head");
    const test = document.querySelector(".test");
    const test2 = document.querySelector(".test2");
    const beautiful_text = document.querySelectorAll(".beautiful-text");
    const divvBox = document.querySelectorAll(".divvBox");
    const insightsBox = document.querySelectorAll(".insightsBox");

    //White->Black
    if (body.style.color === "rgb(37, 37, 37)") {
      body.style.backgroundColor = "#272727";
      body.style.color = "white";
      head.style.boxShadow = "0px 0px 10px 0px rgb(20,20,20)";
      head.style.backgroundColor = "#272727";
      test.style.boxShadow = "0px 0px 10px 0px rgb(20,20,20)";
      test.style.backgroundColor = "#272727";
      test.style.color="white";
      test2.style.boxShadow = "0px 0px 10px 0px rgb(20,20,20)";
      test2.style.backgroundColor = "#272727";
      test2.style.color="white";
      while (divvBox[count]) {
        divvBox[count].style.boxShadow = "0px 0px 10px 0px rgb(20,20,20)";
        count += 1;
      }
      while (insightsBox[insights_count]) {
        insightsBox[insights_count].style.boxShadow =
          "0px 0px 10px 0px rgb(20,20,20)";
        insights_count += 1;
      }
      while (beautiful_text[count_beautifil_txt]) {
        beautiful_text[count_beautifil_txt].style.color = "rgb(209, 174, 255)";
        count_beautifil_txt += 1;
      }
      setim_theme("commonicon");
      setim_name(moon);
    } else {
      //Black->White
      body.style.backgroundColor = "white";
      body.style.color = "rgb(37, 37, 37)";
      head.style.backgroundColor = "white";
      head.style.boxShadow = "0px 0px 10px 0px rgb(223,223,223)";
      test.style.boxShadow = "0px 0px 10px 0px rgb(223,223,223)";
      test.style.backgroundColor = "white";
      test.style.color="rgb(37, 37, 37)";
      test2.style.boxShadow = "0px 0px 10px 0px rgb(223,223,223)";
      test2.style.backgroundColor = "white";
      test2.style.color="rgb(37, 37, 37)";
      while (divvBox[count]) {
        divvBox[count].style.boxShadow = "0px 0px 10px 0px rgb(223,223,223)";
        count += 1;
      }
      while (insightsBox[insights_count]) {
        insightsBox[insights_count].style.boxShadow =
          "0px 0px 10px 0px rgb(223,223,223)";
        insights_count += 1;
      }
      while (beautiful_text[count_beautifil_txt]) {
        beautiful_text[count_beautifil_txt].style.color = "rgb(71, 71, 71)";
        count_beautifil_txt += 1;
      }
      setim_theme("commonicon");
      setim_name(sun);
    }
  };
  return (
    <div class="grid grid-cols-1 divide-x">
      <button onClick={revertThemeFunc}>
        <img className={im_theme} src={im_name} alt="sun" class="commonicon" />
      </button>
    </div>
  );
}
