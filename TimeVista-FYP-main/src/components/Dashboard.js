import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Assuming you're using React Router
import Navbar from "./navbar";
import Footer from "./footer";
import climateanalytics from "../components/images/climateanalytics.png";
import extremeEvents from "../components/images/extremeEvents.png";
import cropyield from "../components/images/crop_prev_ui.png";
import datasets from "../components/images/datasets.png";
import { Link } from "react-router-dom";
import Welcome from "./welcome";

export default function Dashboard() {
  // Check if an item exists in local storage
  function isLocalStorageItemExists(key) {
    return localStorage.getItem(key) !== null;
  }
  useEffect(() => {
    // Example usage
    const itemName = "username"; // Replace with the name of the item you want to check
    const exists = isLocalStorageItemExists(itemName);

    if (!exists) redirectToLink("/../login", 500);
  }, []);

  var redirectToLink = (url, delay) => {
    setTimeout(function () {
      window.location.href = url;
    }, delay);
  };

  return (
    <>
      <div className="themeBlack text-white bgcolor-white">
        <Navbar />
        <div>
          <div className="mt-2 p-2 bg-line"></div>
          <Welcome></Welcome>
          <div className="mt-2 p-2 bg-line"></div>
          <div className="flex_box items-center justify-center mt-8">
            <Link to="/analytics">
              <div className="box-1-selection flex_item mx-5">
                <div className="flex_box">
                  <div className="">
                    <img
                      src={climateanalytics}
                      alt="fOneImg"
                      className="fOneImg"
                    />
                  </div>
                  <div className="flex">
                    <div className="custom-box"></div>
                    <div class="p-4 flex flex-col feature">
                      <div className="title-feature">Climate Analytics</div>
                      <div className="des-feature">
                        Analytics is the systematic exploration, interpretation,
                        and communication of meaningful patterns and insights
                        derived from data.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/extreme-events-map">
              <div className="box-1-selection flex_item mx-5">
                <div className="flex_box">
                  <div className="flex_item">
                    <img
                      src={extremeEvents}
                      alt="fOneImg"
                      className="fOneImg"
                    />
                  </div>
                  <div className="flex_item flex">
                    <div className="custom-box"></div>
                    <div class="p-4 flex flex-col feature">
                      <div className="title-feature">
                        Ex. Events Predictions
                      </div>
                      <div className="des-feature">
                        Analytics is the systematic exploration, interpretation,
                        and communication of meaningful patterns and insights
                        derived from data.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/extreme-events-map">
              <div className="box-1-selection flex_item mx-5">
                <div className="flex_box">
                  <div className="flex_item">
                    <img src={cropyield} alt="fOneImg" className="fOneImg" />
                  </div>
                  <div className="flex_item flex">
                    <div className="custom-box"></div>
                    <div class="p-4 flex flex-col feature">
                      <div className="title-feature">
                        Crop yield Estimations{" "}
                      </div>
                      <div className="des-feature">
                        Analytics is the systematic exploration, interpretation,
                        and communication of meaningful patterns and insights
                        derived from data.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/datasets">
              <div className="box-1-selection  flex_item mx-5">
                <div className="flex_box">
                  <div className="flex_item">
                    <img src={datasets} alt="fOneImg" className="fOneImg" />
                  </div>
                  <div className="flex_item flex">
                    <div className="custom-box"></div>
                    <div class="p-4 flex flex-col feature">
                      <div className="title-feature">Climate Datasets </div>
                      <div className="des-feature">
                        Analytics is the systematic exploration, interpretation,
                        and communication of meaningful patterns and insights
                        derived from data.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/analytics">
              <div className="box-1-selection  flex_item mx-5">
                <div className="flex_box">
                  <div className="flex_item">
                    <img src={datasets} alt="fOneImg" className="fOneImg" />
                  </div>
                  <div className="flex_item flex">
                    <div className="custom-box"></div>
                    <div class="p-4 flex flex-col feature">
                      <div className="title-feature">
                        Water Availibilty Forcasting
                      </div>
                      <div className="des-feature">
                        Analytics is the systematic exploration, interpretation,
                        and communication of meaningful patterns and insights
                        derived from data.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
