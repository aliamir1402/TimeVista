import React from "react";
import Navbar from "./navbar";
import Cover from "./cover";
import Accordion from "./accodation.js";
import logo from "./images/logo.png";
import sun from "./images/sun.png";
import moon from "./images/moon.png";
import earth from "./images/climatecover.png";
import infographic from "./images/icons8-infographic-96.png";
import mlpower from "./images/icons8-ai-96.png";
import extremeevents from "./images/icons8-climate-change-100.png";
import cropsinsights from "./images/icons8-forage-mixed-96.png";
import irrigation from "./images/icons8-irrigation-96.png";
import datavisual from "./images/icons8-data-visualization-68.png";
import Footer from "./footer.js";
import AboutUsCover from "../components/images/climatecover.png";
import F1 from "../components/images/FeatureOneImg.jpg";
import F2 from "../components/images/FeatureTwoImg-removebg-preview.png";
import F3 from "../components/images/FeatureThreeImg.jpg";
import F4 from "../components/images/FeatureFourImg-removebg-preview.png";

export default function Home() {
  return (
    <>
      <div className="">
        <div className="themeBlack">
          <Navbar
            l={logo}
            navA={"Feature A"}
            navB={"Feature B"}
            navC={"Feature C"}
            navD={"Feature D"}
            sun={sun}
            moon={moon}
          ></Navbar>
          <Cover Earth={earth}></Cover>
        </div>

        <div className="bor pt-24 bgimg">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-4xl">
              TimeVista{" "}
              <span class="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Ecosystem
              </span>
            </p>
            <p className="mx-28 my-4 mb-0">
              TimeVista is a groundbreaking project that encapsulates over four
              decades of historical climate data, spanning 1980 to 2022, with a
              singular focus: Revolutionizing Pakistan's agricultural landscape.
            </p>
          </div>

          <div className="mt-12 mx-12 bor flex_box anamation3">
            <div className="m-4 feature-box flex_item">
              <div className="">
                <img src={infographic} alt="info" height={50} width={50} />
              </div>
              <div className="p-2">
                <span className="text-white text-2xl">
                  DYNAMIC INTERACTIVE INFOGRAPHICS
                </span>
              </div>
              <div className="p-2">
                <span className="text-gray-300 text-base">
                  Suggests the use of visually engaging and interactive graphics
                  that can dynamically change based on user input or real-time
                  data. It's a way to present information in a more engaging and
                  user-friendly manner.
                </span>
              </div>
            </div>
            <div className="m-4 feature-box flex_item">
              <div>
                <img src={mlpower} alt="info" height={50} width={50} />
              </div>
              <div className="p-2">
                <span className="text-white text-2xl">
                  ML-POWERED PREDICTIVE INSIGHTS
                </span>
              </div>
              <div className="p-2">
                <span className="text-gray-300 text-base">
                  Implies that predictive insights, likely related to
                  agriculture or water resources, are generated using machine
                  learning algorithms.
                </span>
              </div>
            </div>
            <div className="m-4 feature-box flex_item">
              <div>
                <img src={extremeevents} alt="info" height={50} width={50} />
              </div>
              <div className="p-2">
                <span className="text-white text-2xl">
                  WARNING EXTREME EVENTS
                </span>
              </div>
              <div className="p-2">
                <span className="text-gray-300 text-base">
                  {" "}
                  Implies that the system can detect and warn about extreme
                  events. In the context of agriculture and water resources,
                  this might involve predicting and alerting users about extreme
                  weather conditions, droughts, floods, or other events that
                  could impact crops and water availability.
                </span>
              </div>
            </div>
          </div>

          <div className="bor mx-12 mb-20 flex_box anamation3">
            <div className="m-4 feature-box flex_item">
              <div>
                <img src={cropsinsights} alt="info" height={50} width={50} />
              </div>
              <div className="p-2">
                <span className="text-white-900 text-2xl">
                  CROP INSIGHTS UNVEILED
                </span>
              </div>
              <div className="p-2">
                <span className="text-gray-300 text-base">
                  {" "}
                  Focus on crop insights suggests that the system provides
                  detailed information and analysis related to crops. This could
                  include growth patterns, health assessments, yield
                  predictions, and other relevant data.
                </span>
              </div>
            </div>
            <div className="m-4 feature-box flex_item">
              <div>
                <img src={irrigation} alt="info" height={50} width={50} />
              </div>
              <div className="p-2">
                <span className="text-white text-2xl">
                  AIR QUALITY AND SMOG INGHTS{" "}
                </span>
              </div>
              <div className="p-2">
                <span className="text-gray-300 text-base">
                  Explore real-time updates and detailed analyses on air quality
                  and smog conditions with our comprehensive feature. With
                  interactive maps, pinpoint areas of concern and track
                  pollution hotspots, enabling proactive measures to mitigate
                  exposure.
                </span>
              </div>
            </div>
            <div className="m-4 feature-box flex_item">
              <div>
                <img src={datavisual} alt="info" height={50} width={50} />
              </div>
              <div className="p-2">
                <span className="text-white text-2xl">
                  REAL-TIME DATA VISUALIZATION
                </span>
              </div>
              <div className="p-2">
                <span className="text-gray-300 text-base">
                  Enables the dynamic representation of information, allowing
                  users to view and analyze data in real-time, enhancing the
                  understanding of trends and patterns as they unfold.
                </span>
              </div>
            </div>
          </div>

          <div
            className="flex_box pt-16 pb-16"
            style={{
              height: "100%",
              backgroundColor: "#333333",
              color: "white",
              borderTop: "10px solid",
              borderBottom: "10px solid",
              borderImage:
                "linear-gradient(90deg, #719b5c, #23634b, #23634c6b, #00000067) 1",
            }}
          >
            <div style={{ width: "45%", paddingLeft: "5vw" }} className="anamation">
              <img
                src={AboutUsCover}
                alt="AboutUsCover"
                width="90%"
                height="90%"
              />
            </div>
            <div style={{ width: "55%" }}>
              <div className="about-title-2 anamation3">
                TimeVista{" "}
                <span class="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  Features
                </span>
              </div>
              <div className="about-description-2 anamation3"></div>
              <div className="flex_box mb-8">
                <div
                  className="flex_box flex_item anamation3"
                  style={{
                    border: "3px solid #fdfdfd",
                    padding: "6px",
                    margin: "1%",
                    borderRadius: "10px",
                    width: "10vw",
                  }}
                >
                  <div className="flex justify-center items-center mr-2">
                    <img src={F1} alt="icon" height={100} width={100} />
                  </div>
                  <div>
                    <div className="section-2-title">
                      Agriculture Weather <br />
                      Prediction
                    </div>
                    <div className="section-2-description">
                      Charts & Infographics
                    </div>
                  </div>
                </div>
                <div
                  className="flex_box flex_item anamation3"
                  style={{
                    border: "3px solid #fdfdfd",
                    padding: "7px",
                    margin: "1%",
                    borderRadius: "10px",
                    width: "10vw",
                  }}
                >
                  <div className="flex justify-center items-center mr-2">
                    <img src={F2} alt="icon" height={100} width={100} />
                  </div>
                  <div>
                    <div className="section-2-title">
                      Crop Yield <br /> Forecasting
                    </div>
                    <div className="section-2-description">
                      Analytics & AI Insights
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex_box mb-8 anamation3">
                <div
                  className="flex_box flex_item"
                  style={{
                    border: "3px solid #fdfdfd",
                    padding: "7px",
                    margin: "1%",
                    borderRadius: "10px",
                    width: "10vw",
                  }}
                >
                  <div className="flex justify-center items-center mr-2">
                    <img src={F3} alt="icon" height={100} width={100} />
                  </div>
                  <div>
                    <div className="section-2-title">Smog Predictions</div>
                    <div className="section-2-description">
                      Analytics & AI Insights
                    </div>
                  </div>
                </div>
                <div
                  className="flex_box flex_item"
                  style={{
                    border: "3px solid #fdfdfd",
                    padding: "7px",
                    margin: "1%",
                    borderRadius: "10px",
                    width: "10vw",
                  }}
                >
                  <div className="flex justify-center items-center mr-2">
                    <img src={F4} alt="icon" height={100} width={100} />
                  </div>
                  <div className="justify-center items-center">
                    <div className="section-2-title">
                      Climate Analytics <br /> Insights{" "}
                    </div>
                    <div className="section-2-description">
                      Infographics & Charts
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ color: "white" }}>
            <Accordion></Accordion>
          </div>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}
