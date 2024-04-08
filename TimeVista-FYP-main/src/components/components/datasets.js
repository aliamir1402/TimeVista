import React, { useState, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import DatasetPic from "../components/images/LandScapeImg.jpg";
import Loader from "../components/loader";

export default function Datasets() {
  const [Flag, setFlag] = useState(false);
  const items = ["Apple", "Banana", "Orange", "Orange", "Orange", "Orange"];

  useEffect(() => {
    async function fetchData(reqObj) {
      try {
        const response = await fetch("http://localhost:5000/api/Datasets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqObj),
        });
        var data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setFlag(true);
      }
    }
    fetchData({});
    // Call fetchData function here with necessary request object
    // Example: fetchData({ /* your request object */ });
  }, []);

  if (Flag)
    return (
      <>
        <div className="datasets-main">
          <div
            style={{
              background: "linear-gradient(to right,#12251e,#274137)",
              color: "white",
            }}
          >
            <Header></Header>
          </div>
          <div className="section-dataset">
            <div className="title-dataset">Title</div>
            <div className="description-dataset">Description</div>
            <div className="searchbar-dataset">
              <input type="text" placeholder="Filter list of datasets" />
            </div>
            <div className="divider-dataset"></div>
            <div className="main-secion flex_box">
              {items.map((item, index) => (
                <div className="box-dataset">
                  <div className="sub-title-datasets">{item}</div>
                  <div className="img-dataset">
                    <img src={DatasetPic} alt="" />
                  </div>
                  <div className="divider-dataset"></div>
                  <div className="sub-description-dataset">Sub-Description</div>
                  <div className="divider-dataset"></div>
                  <div className="tags flex_box">
                    {items.map((item, index) => (
                      <div className="sub-tag">{item}</div>
                    ))}{" "}
                  </div>
                  <div className="divider-dataset"></div>
                </div>
              ))}
            </div>
          </div>
          <Footer></Footer>
        </div>
      </>
    );
  else {
    return (
      <>
        <div className="flex justify-center items-center pt-72">
          <Loader></Loader>{" "}
        </div>
      </>
    );
  }
}
