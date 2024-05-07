import React, { useState, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import DatasetPic from "../components/images/LandScapeImg.jpg";
import Loader from "../components/loader";
import dataset from "../components/images/pakistan-dataset.png";

export default function Datasets() {
  const [Flag, setFlag] = useState(false);
  const items = [
    "ClimateChrono: 1980-2020 Climate Archive (Pakistan)",
    "CropMetrics: Comprehensive Dataset on Crop Area, Production, and Yield (Pakistan)",
    "SmogSense: Detailed Dataset on Smog Metrics and Air Quality Parameters (Pakistan)",
  ];
  const sub_items = [
    "Explore detailed records of crop cultivation areas, production volumes, and yield metrics spanning from 1980 to 2020. Gain valuable insights into agricultural trends and performance over the past four decades, facilitating informed decision-making for farmers, policymakers, and researchers.",
    "Dive into an integrated dataset combining comprehensive crop-related metrics with detailed smog data. Uncover correlations between agricultural practices and air quality parameters, enabling holistic analyses and targeted interventions to address environmental challenges.",
    "Access granular information on smog levels, atmospheric pollutants, and air quality indices, offering valuable insights into the dynamics of urban air pollution. Utilize this dataset for monitoring smog trends, assessing health risks, and implementing effective pollution control measures.",
  ];
  const tags = [
    [
      "CropData",
      "Agriculture",
      "CropProduction",
      "YieldAnalysis",
      "FarmingTrends",
      "CropPerformance",
      "AgriculturalMetrics",
      "HistoricalData",
      "CropYield",
    ],
    [
      "CropData",
      "SmogData",
      "IntegratedData",
      "Agriculture",
      "AirQuality",
      "CropSmogCorrelation",
      "EnvironmentalAnalysis",
      "DataIntegration",
      "SmogMetrics",
      "CropPerformance",
    ],
    [
      "SmogData",
      "AirQuality",
      "PollutionMetrics",
      "SmogAnalysis",
      "EnvironmentalHealth",
      "UrbanPollution",
      "AtmosphericPollutants",
      "HealthRisks",
      "AirQualityIndex",
      "SmogTrends",
    ],
  ];

  useEffect(() => {
    async function fetchData(reqObj) {
      try {
        const response = await fetch("http://localhost:4000/api/Datasets", {
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
            <div className="title-dataset">DataSets</div>
            <div className="description-dataset">
              The Dataset page on TimeVista provides detailed descriptions of
              climate datasets, including variables like temperature,
              precipitation, and wind patterns spanning over 40 years. Users can
              explore interactive visualizations and utilize filters to access
              specific datasets tailored to their needs, supporting informed
              decision-making in areas such as agriculture, air quality, and
              climate research.
            </div>
            <div className="searchbar-dataset">
              <input type="text" placeholder="Filter list of datasets" />
            </div>
            <div className="divider-dataset"></div>
            <div className="main-secion flex_box">
              {items.map((item, index) => (
                <div className="box-dataset">
                  <div className="sub-title-datasets">{item}</div>
                  <div className="img-dataset">
                    <img src={dataset} alt="" />
                  </div>
                  <div className="divider-dataset"></div>
                  <div className="sub-description-dataset">
                    {sub_items[index]}
                  </div>
                  <div className="divider-dataset"></div>
                  <div className="tags flex_box">
                    {tags[index].map((iem, ind) => (
                      <div className="sub-tag">{iem}</div>
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
