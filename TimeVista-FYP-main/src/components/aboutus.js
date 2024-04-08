import React, { useState, useEffect } from "react";
import Accodation from "./accodation";
import Header from "./header";
import Footer from "./footer";
import AboutUsCover from "../components/images/coverabout.png";
import Icon from "../components/images/tornado.png";

export default function Aboutus() {
  return (
    <>
      <div className="about-section">
        <div
          style={{
            background: "linear-gradient(to right,#12251e,#274137)",
            color: "white",
          }}
        >
          <Header></Header>
        </div>
        <div className="section-one flex_box">
          <div className="bor sub-section-one">
            <div className="about-title-section-one">About Us</div>
            <div className="about-description-section-one">
              <p className="text-sm">
                TimeVista is a groundbreaking project that encapsulates over
                four decades of historical climate data, spanning 1980 to 2022,
                with a singular focus: revolutionizing Pakistan's agricultural
                landscape. It aims at unlocking predictive insights into:
              </p>
              <div className="text-sm bor mt-4 mb-4">
                <span className="p-4">• Climate and Events Analytics</span>
                <br />
                <span className="p-4">• Extreme Weather Events</span>
                <br />
                <span className="p-4">• Crop Yield Forecasts</span>
                <br />
              </div>

              <p className="text-sm">
                At its core, TimeVista is dedicated to the aggregation,
                preprocessing, and analysis of diverse historical climate
                datasets sourced from satellites, weather stations, and other
                relevant sources. This entails meticulous data cleaning,
                standardization, and the deployment of cutting-edge machine
                learning algorithms, like LSTM models, to unearth patterns,
                forecast extreme weather events, predict crop yields, and assess
                water availability.
              </p>
            </div>
          </div>
          <div className="" style={{ width: "50%" }}>
            <img src={AboutUsCover} alt="AboutUs" />
          </div>
        </div>
        <div className="flex_box pt-12 pb-12" style={{ height: "100%" }}>
          <div style={{ width: "50%" }}>
            <img src={AboutUsCover} alt="AboutUsCover" />
          </div>
          <div style={{ width: "50%" }}>
            <div className="about-title-2">App Features</div>
            <div className="about-description-2">Description</div>
            <div className="">
              <div className="flex_box mb-8">
                <div
                  className="flex_box flex_item"
                  style={{
                    border: "2px solid #e9e9e9",
                    padding: "10px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    borderRadius: "10px",
                  }}
                >
                  <div>
                    <img src={Icon} alt="icon" height={80} width={80} />
                  </div>
                  <div>
                    <div className="section-2-title">Title-1</div>
                    <div className="section-2-description">Description</div>
                  </div>
                </div>
                <div
                  className="flex_box flex_item"
                  style={{
                    border: "2px solid #e9e9e9",
                    padding: "10px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    borderRadius: "10px",
                  }}
                >
                  <div>
                    <img src={Icon} alt="icon" height={80} width={80} />
                  </div>
                  <div>
                    <div className="section-2-title">Title-1</div>
                    <div className="section-2-description">Description</div>
                  </div>
                </div>
              </div>
              <div className="flex_box mb-8">
                <div
                  className="flex_box flex_item"
                  style={{
                    border: "2px solid #e9e9e9",
                    padding: "10px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    borderRadius: "10px",
                  }}
                >
                  <div>
                    <img src={Icon} alt="icon" height={80} width={80} />
                  </div>
                  <div>
                    <div className="section-2-title">Title-1</div>
                    <div className="section-2-description">Description</div>
                  </div>
                </div>
                <div
                  className="flex_box flex_item"
                  style={{
                    border: "2px solid #e9e9e9",
                    padding: "10px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    borderRadius: "10px",
                  }}
                >
                  <div>
                    <img src={Icon} alt="icon" height={80} width={80} />
                  </div>
                  <div>
                    <div className="section-2-title">Title-1</div>
                    <div className="section-2-description">Description</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <Accodation></Accodation>
        <Footer></Footer>
      </div>
    </>
  );
}
