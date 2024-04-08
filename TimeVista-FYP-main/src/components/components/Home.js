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
import Btick from "./images/bluetick.png";
import Ytick from "./images/yellowtick.png";
import Gtick from "./images/greentick.png";
import Footer from "./footer.js";

export default function Home() {
  return (
    <>
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

        <div className="bor mt-32">
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

          <div className="mt-12 mx-12 bor flex_box">
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

          <div className="bor mx-12 mb-20 flex_box">
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
                  ASSESSING WATER AVAILABILITY
                </span>
              </div>
              <div className="p-2">
                <span className="text-gray-300 text-base">
                  The system includes features specifically designed to assess
                  the availability of water. It could involve monitoring water
                  levels, predicting changes, and providing insights into water
                  resource management.
                </span>
              </div>
            </div>
            <div className="m-4 feature-box flex_item">
              <div>
                <img src={datavisual} alt="info" height={50} width={50} />
              </div>
              <div className="p-2">
                <span className="text-white text-2xl">
                  Real-time Data Visualization
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

          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-4xl">
              System{" "}
              <span class="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                Packages
              </span>
            </p>
            <p className="mx-28 my-4 mb-0">
              TimeVista is a groundbreaking project that encapsulates over four
              decades of historical climate data, spanning 1980 to 2022, with a
              singular focus: Revolutionizing Pakistan's agricultural landscape.
            </p>
          </div>

          <div className="bor m-20 mt-12 flex_box">
            <div
              className="bor mt-12 m-2 flex_item justify-center items-center"
              style={{ backgroundColor: "#151515", borderRadius: "17px" }}
            >
              <div
                className="text-4xl p-2 bg-gradient-to-b from-green-600 to-green-500 text-white font-bold text-center"
                style={{ borderRadius: "17px 17px 0px 0px" }}
              >
                BASIC
              </div>
              <div className="text-6xl p-2 bg-gradient-to-b from-green-500 to-blue-400 text-black font-bold text-center ">
                $9.99
              </div>

              <div className="packages text-white font-bold pt-4">
                <div className="flex justify-left items-left pl-20">
                  <div className="p-2">
                    <img src={Gtick} alt="greentick" height={30} width={30} />
                  </div>
                  <div className="p-2.5">lorem ipsu </div>
                </div>
                <div className="flex justify-left items-left bg-black  pl-20">
                  <div className="p-2">
                    <img src={Gtick} alt="greentick" height={30} width={30} />
                  </div>
                  <div className="p-2.5">lorem ipsus</div>
                </div>
                <div className="flex justify-left items-left pl-20">
                  <div className="p-2">
                    <img src={Gtick} alt="greentick" height={30} width={30} />
                  </div>
                  <div className="p-2.5">lorem ipsu</div>
                </div>
                <div className="flex justify-left items-left bg-black  pl-20">
                  <div className="p-2">
                    <img src={Gtick} alt="greentick" height={30} width={30} />
                  </div>
                  <div className="p-2.5">lorem ipsu</div>
                </div>
              </div>
              <div className="text-center p-4">
                <button className="p-6 pt-2 pb-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-black font-bold">
                  BUY NOW
                </button>
              </div>
            </div>

            <div
              className="bor mt-2 m-2 flex_item justify-center items-center"
              style={{ backgroundColor: "#151515", borderRadius: "17px" }}
            >
              <div
                className="text-4xl p-2 bg-gradient-to-b from-yellow-500 to-yellow-400 text-white font-bold text-center"
                style={{ borderRadius: "17px 17px 0px 0px" }}
              >
                Premium
              </div>
              <div className="text-6xl p-2 bg-gradient-to-b from-yellow-400 to-yellow-300 text-black font-bold text-center">
                $29.99
              </div>

              <div className="packages text-white font-bold pt-4">
                <div className="flex justify-left items-left pl-20">
                  <div className="p-2">
                    <img src={Gtick} alt="greentick" height={30} width={30} />
                  </div>
                  <div className="p-2.5">lorem ipsu </div>
                </div>
                <div className="flex justify-left items-left bg-black  pl-20">
                  <div className="p-2">
                    <img src={Gtick} alt="greentick" height={30} width={30} />
                  </div>
                  <div className="p-2.5">lorem ipsus</div>
                </div>
                <div className="flex justify-left items-left pl-20">
                  <div className="p-2">
                    <img src={Gtick} alt="greentick" height={30} width={30} />
                  </div>
                  <div className="p-2.5">lorem ipsu</div>
                </div>
                <div className="flex justify-left items-left bg-black  pl-20">
                  <div className="p-2">
                    <img src={Gtick} alt="greentick" height={30} width={30} />
                  </div>
                  <div className="p-2.5">lorem ipsu</div>
                </div>
              </div>
              <div className="text-center p-4">
                <button className="p-6 pt-2 pb-2 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold">
                  BUY NOW
                </button>
              </div>
            </div>

            <div
              className="bor mt-12 m-2 flex_item justify-center items-center"
              style={{ backgroundColor: "#151515", borderRadius: "17px" }}
            >
              <div
                className="text-4xl p-2 bg-gradient-to-b from-green-600 to-green-500 text-white font-bold text-center"
                style={{ borderRadius: "17px 17px 0px 0px" }}
              >
                STANDARD
              </div>
              <div className="text-6xl p-2 bg-gradient-to-b from-green-500 to-blue-400 text-black font-bold text-center">
                $19.99
              </div>

              <div className="packages text-white font-bold pt-4">
                <div className="flex justify-left items-left pl-20">
                  <div className="p-2">
                    <img src={Gtick} alt="greentick" height={30} width={30} />
                  </div>
                  <div className="p-2.5">lorem ipsu </div>
                </div>
                <div className="flex justify-left items-left bg-black  pl-20">
                  <div className="p-2">
                    <img src={Gtick} alt="greentick" height={30} width={30} />
                  </div>
                  <div className="p-2.5">lorem ipsus</div>
                </div>
                <div className="flex justify-left items-left pl-20">
                  <div className="p-2">
                    <img src={Gtick} alt="greentick" height={30} width={30} />
                  </div>
                  <div className="p-2.5">lorem ipsu</div>
                </div>
                <div className="flex justify-left items-left bg-black  pl-20">
                  <div className="p-2">
                    <img src={Gtick} alt="greentick" height={30} width={30} />
                  </div>
                  <div className="p-2.5">lorem ipsu</div>
                </div>
              </div>
              <div className="text-center p-4">
                <button className="p-6 pt-2 pb-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-black font-bold">
                  BUY NOW
                </button>
              </div>
            </div>
          </div>

          <Accordion></Accordion>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}
