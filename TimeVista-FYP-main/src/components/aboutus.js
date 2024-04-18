import React from "react";
import Accodation from "./accodation";
import Header from "./header";
import Footer from "./footer";
import AboutUsCover from "../components/images/climatecover.png";
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
        ></div>
        <div className="section-one flex_box">
          <Header></Header>
          <div className="bor sub-section-one">
            <div className="about-title-section-one">About Us</div>
            <div className="about-description-section-one">
              <p>
                TimeVista is a groundbreaking project that encapsulates over
                four decades of historical climate data, spanning 1980 to 2022,
                with a singular focus: revolutionizing Pakistan's agricultural
                landscape. It aims at unlocking predictive insights into:
              </p>
              <div className="bor mt-4 mb-4">
                <div className="item-about">Climate and Events Analytics</div>
                <br />
                <div className="item-about">Extreme Weather Events</div>
                <br />
                <div className="item-about">Crop Yield Forecasts</div>
                <br />
              </div>

              {/*<p className="text-sm">
                At its core, TimeVista is dedicated to the aggregation,
                preprocessing, and analysis of diverse historical climate
                datasets sourced from satellites, weather stations, and other
                relevant sources. This entails meticulous data cleaning,
                standardization, and the deployment of cutting-edge machine
                learning algorithms, like LSTM models, to unearth patterns,
                forecast extreme weather events, predict crop yields, and assess
                water availability.
        </p>*/}
            </div>
          </div>
          <div
            className="flex justify-center items-center"
            style={{
              opacity: "0" /* Set initial opacity to 0 */,
              width: "28%",
              paddingRight: "10%",
              animation:
                "slideInRight 1s ease forwards" /* Apply slide-in animation */,
            }}
          >
            <img src={AboutUsCover} alt="AboutUs" width="100%" height="100%" />
          </div>
        </div>
        <div
          className="flex_box pt-16 pb-16"
          style={{ height: "100%", backgroundColor: "#ffffdf" }}
        >
          <div style={{ width: "50%", paddingLeft: "5vw" }}>
            <img
              src={AboutUsCover}
              alt="AboutUsCover"
              width="90%"
              height="90%"
            />
          </div>
          <div style={{ width: "50%" }}>
            <div className="about-title-2">App Features</div>
            <div className="about-description-2">Description</div>
            <div className="">
              <div className="flex_box mb-8">
                <div
                  className="flex_box flex_item"
                  style={{
                    border: "3px solid #fdfdfd",
                    padding: "7px",
                    borderRadius: "10px",
                    width: "fit-content",
                  }}
                >
                  <div>
                    <img src={Icon} alt="icon" height={80} width={80} />
                  </div>
                  <div>
                    <div className="section-2-title">Events Analytics</div>
                    <div className="section-2-description">
                      Charts/Dashboards
                    </div>
                  </div>
                </div>
                <div
                  className="flex_box flex_item"
                  style={{
                    border: "3px solid #fdfdfd",
                    padding: "10px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    borderRadius: "10px",
                    width: "fit-content",
                  }}
                >
                  <div>
                    <img src={Icon} alt="icon" height={80} width={80} />
                  </div>
                  <div>
                    <div className="section-2-title">Forecast Ex.Events</div>
                    <div className="section-2-description">
                      Usage of LSTM Models
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex_box mb-8">
                <div
                  className="flex_box flex_item"
                  style={{
                    border: "3px solid #fdfdfd",
                    padding: "10px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    borderRadius: "10px",
                    width: "fit-content",
                  }}
                >
                  <div>
                    <img src={Icon} alt="icon" height={80} width={80} />
                  </div>
                  <div>
                    <div className="section-2-title">Crop Yield Forecasts</div>
                    <div className="section-2-description">Description</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div id="accordation-about">
          <Accodation></Accodation>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
