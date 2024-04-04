import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Map from "./Maps.js";
import Loader from "../components/loader.js";
import Header from "../components/header.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [name, setName] = useState("Ali Amir Khawaja");
  const [value, setValue] = useState(0);
  const [loaderFlag, setLoaderFlag] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [timecounter, setTimecounter] = useState(1980);
  const [isSelected1, setIsSelected1] = useState(false);
  const [isSelected2, setIsSelected2] = useState(false);
  const [isSelected3, setIsSelected3] = useState(false);
  const [isSelected4, setIsSelected4] = useState(false);
  const [isSelected5, setIsSelected5] = useState(false);
  const [isSelected6, setIsSelected6] = useState(false);
  const [isSelected7, setIsSelected7] = useState(false);
  const [isSelected8, setIsSelected8] = useState(false);
  const [isSelected9, setIsSelected9] = useState(false);
  const [isSelected10, setIsSelected10] = useState(false);
  const [isSelected11, setIsSelected11] = useState(false);
  const [isSelected12, setIsSelected12] = useState(false);
  const [gisflag, setGisflag] = useState(0);
  const [arrowData, setArrowData] = useState([]);
  const [feature, setFeature] = useState(0);
  const [time, setTime] = useState(0);
  const [monthcounter, setMonthcounter] = useState(0);
  const [selectPrompt, setSelectPrompt] = useState(" Select All");
  const [mapsData, setMapsData] = useState([]);

  useEffect(() => {
    const fetchData = async (reqObj) => {
      try {
        const response = await fetch("http://localhost:5000/api/ExEvents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqObj),
        });
        const responseData = await response.json();
        console.log(responseData);

        setEventsData(responseData);
        console.log(eventsData);
        // Process responseData as needed
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoaderFlag(true);
      }
    };
    fetchData({});
    // Call fetchData function here with necessary request object
    // Example: fetchData({ /* your request object */ });
  }, []); // Empty dependency array means this effect runs only once after initial render

  const Month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const prevSlideMonth = () => {
    if (monthcounter - 1 < 0) {
      document.getElementById("prevMonth").disabled = true;
      document.getElementById("nextMonth").disabled = false;
    } else {
      setMonthcounter(monthcounter - 1);
      document.getElementById("nextMonth").disabled = false;
    }
    /*setTimeout(() => {
      DataFetchGISLayer();
    }, 0);*/
  };

  const nextSlideMonth = () => {
    let currentMonth = 11;
    if (monthcounter + 1 > currentMonth) {
      setMonthcounter(monthcounter);
      document.getElementById("prevMonth").disabled = false;
      document.getElementById("nextMonth").disabled = true;
    } else {
      setMonthcounter(monthcounter + 1);
      document.getElementById("prevMonth").disabled = false;
    }
    /*setTimeout(() => {
      DataFetchGISLayer();
    }, 0);*/
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const prevSlide = () => {
    if (timecounter - 1 < 1980) {
      setTimecounter(timecounter);
      document.getElementById("prev").disabled = true;
      document.getElementById("next").disabled = false;
    } else {
      setTimecounter(timecounter - 1);
      document.getElementById("next").disabled = false;
    }
    setTimeout(() => {
      DataFetchLayer();
    }, 0);
  };

  const nextSlide = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    if (timecounter + 1 > currentYear) {
      setTimecounter(timecounter);
      document.getElementById("prev").disabled = false;
      document.getElementById("next").disabled = true;
    } else {
      setTimecounter(timecounter + 1);
      document.getElementById("prev").disabled = false;
    }
    setTimeout(() => {
      DataFetchLayer();
    }, 0);
  };

  const DataFetchLayer = () => {
    setGisflag(0);
    let feature = [];
    let filterArray = [];
    if (isSelected1) feature.push("Drought");
    if (isSelected2) feature.push("Earthquake");
    if (isSelected3) feature.push("Winds");
    if (isSelected4) feature.push("RainFall");
    if (isSelected5) feature.push("Floods");
    if (isSelected6) feature.push("Snow");
    if (isSelected7) feature.push("Heatwave");
    if (isSelected8) feature.push("Cyclone");
    if (isSelected9) feature.push("Hailstorm");
    if (isSelected10) feature.push("Locust");
    if (isSelected12) setTime(1);

    for (let i = 0; i < eventsData.length; i++) {
      if (eventsData[i].Event in feature) {
        filterArray.push(eventsData[i]);
      }
    }

    let arr = [];

    for (let i = 0; i < filterArray.length; i++) {
      arr.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: filterArray[i].coordinates, // Coordinates for Sialkot
        },
        properties: {
          cityName: filterArray[i].city,
          icon: filterArray[i].icon,
        },
      });
    }

    setMapsData({
      type: "FeatureCollection",
      features: arr,
    });
    setGisflag(1);
  };

  const handleButtonClick1 = () => {
    setIsSelected1(!isSelected1); // Toggle isSelected state
  };
  const handleButtonClick2 = () => {
    setIsSelected2(!isSelected2); // Toggle isSelected state
  };
  const handleButtonClick3 = () => {
    setIsSelected3(!isSelected3); // Toggle isSelected state
  };
  const handleButtonClick4 = () => {
    setIsSelected4(!isSelected4); // Toggle isSelected state
  };
  const handleButtonClick5 = () => {
    setIsSelected5(!isSelected5); // Toggle isSelected state
  };
  const handleButtonClick6 = () => {
    setIsSelected6(!isSelected6); // Toggle isSelected state
  };
  const handleButtonClick7 = () => {
    setIsSelected7(!isSelected7); // Toggle isSelected state
  };
  const handleButtonClick8 = () => {
    setIsSelected8(!isSelected8); // Toggle isSelected state
  };
  const handleButtonClick9 = () => {
    setIsSelected9(!isSelected9); // Toggle isSelected state
  };
  const handleButtonClick10 = () => {
    setIsSelected10(!isSelected10); // Toggle isSelected state
  };
  const handleButtonClick11 = () => {
    setIsSelected11(!isSelected11); // Toggle isSelected state
  };

  const handleButtonClick12 = () => {
    setIsSelected12(!isSelected12); // Toggle isSelected state
    if (!isSelected9) {
      document.getElementById("disabled-year").style.pointerEvents = "all";
      document.getElementById("disabled-year").style.opacity = "1";
      //document.getElementById("disabled-month").style.pointerEvents = "none";
      //document.getElementById("disabled-month").style.opacity = "0.5";
    } else {
      document.getElementById("disabled-year").style.pointerEvents = "none";
      document.getElementById("disabled-year").style.opacity = "0.5";
      //document.getElementById("disabled-month").style.pointerEvents = "none";
      //document.getElementById("disabled-month").style.opacity = "0.5";
    }
  };
  const selectAllHandle = (event) => {
    const checkbox = document.getElementById("checkbox");
    if (checkbox.checked) {
      setIsSelected1(1);
      setIsSelected2(1);
      setIsSelected3(1);
      setIsSelected4(1);
      setIsSelected5(1);
      setIsSelected6(1);
      setIsSelected7(1);
      setIsSelected8(1);
      setIsSelected9(1);
      setIsSelected10(1);
      setSelectPrompt(" De-Select All");
    } else {
      setIsSelected1(0);
      setIsSelected2(0);
      setIsSelected3(0);
      setIsSelected4(0);
      setIsSelected5(0);
      setIsSelected6(0);
      setIsSelected7(0);
      setIsSelected8(0);
      setIsSelected9(0);
      setIsSelected10(0);
      setSelectPrompt(" Select All");
    }
  };

  /*const handleButtonClick10 = () => {
    setIsSelected10(!isSelected10); // Toggle isSelected state
    setIsSelected9(false);
    setIsSelected11(false);
    if (!isSelected10) {
      document.getElementById("disabled-year").style.pointerEvents = "all";
      document.getElementById("disabled-month").style.pointerEvents = "all";
      document.getElementById("disabled-year").style.opacity = "1";
      document.getElementById("disabled-month").style.opacity = "1";
    } else {
      document.getElementById("disabled-year").style.pointerEvents = "none";
      document.getElementById("disabled-month").style.pointerEvents = "none";
      document.getElementById("disabled-year").style.opacity = "0.5";
      document.getElementById("disabled-month").style.opacity = "0.5";
    }
  };*/

  if (loaderFlag) {
    return (
      <>
        <Header></Header>
        <div className="analytics-main">
          <div className="welcome-box-analytics">
            <div className="text-md font-normal">Welcome, {name}</div>
            <div className="text-3xl font-bold">
              Disasters{" "}
              <span className="text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text font-bold text-3xl">
                Dashboard
              </span>
            </div>
          </div>
          <div
            className="pt-8 pl-12 flex_box"
            style={{
              fontSize: "25px",
              backgroundColor: "#f8f9fb",
              fontWeight: 800,
              marginBottom: "2%",
            }}
          >
            <div
              style={{
                border: "3px solid #2d5b40",
                borderRadius: "10px",
                width: "5px",
                marginRight: "5px",
                height: "35px",
              }}
            ></div>
            <div>Extreme Events Screener</div>
          </div>

          <div className="bor flex_box pl-12 pr-12">
            <div className="bor flex_item">
              <div>Pakistan - 1980 Onwards...</div>
              <div className="bor flex_box">
                <div className="bor flex_item">
                  <div className="bor">Regions</div>
                  <div className="bor flex justify-center items-center">5</div>
                </div>
                <div className="bor flex_item">
                  <div className="bor">Cities</div>
                  <div className="bor flex justify-center items-center">40</div>
                </div>
              </div>
              <div className="bor flex_box">
                <div className="bor flex_item">
                  <div className="bor">Disasters</div>
                  <div className="bor flex justify-center items-center">5</div>
                </div>
                <div className="bor flex_item">
                  <div className="bor">Affectees</div>
                  <div className="bor flex justify-center items-center">40</div>
                </div>
              </div>
            </div>
            <div className="bor flex_item">
              <div className="flex">
                <div className="bor flex_item">
                  <div>Drought</div>
                  <div className="bor flex justify-center items-center">40</div>
                </div>
                <div className="bor flex_item">
                  <div>Earthquake</div>
                  <div className="bor flex justify-center items-center">40</div>
                </div>
              </div>
              <div className="flex">
                <div className="bor flex_item">
                  <div>Winds</div>
                  <div className="bor flex justify-center items-center">50</div>
                </div>
                <div className="bor flex_item">
                  <div>RainFall</div>
                  <div className="bor flex justify-center items-center">50</div>
                </div>
              </div>
              <div className="flex">
                <div className="bor flex_item">
                  <div>Floods</div>
                  <div className="bor flex justify-center items-center">50</div>
                </div>
                <div className="bor flex_item">
                  <div>Heatwave</div>
                  <div className="bor flex justify-center items-center">50</div>
                </div>
              </div>
              <div className="flex">
                <div className="bor flex_item">
                  <div>Snow</div>
                  <div className="bor flex justify-center items-center">50</div>
                </div>
              </div>
            </div>
          </div>

          <div id="gis-layer" className="flex_box">
            <div id="sidebar-gis" className="bor">
              <div className="mt-4">
                <div className="flex items-center justify-center m-1 text-xl font-semibold">
                  <p
                    className="flex items-center justify-center p-2"
                    style={{
                      width: "100%",
                      backgroundColor: "#afdbba",
                      borderRadius: "10px",
                      margin: "10px",
                      boxShadow: "0px 0px 10px 0px #f9f9f9",
                    }}
                  >
                    Disasters
                  </p>
                </div>
                <div className="flex justify-center text-center w-fit ml-6">
                  <div>
                    <input
                      style={{
                        borderRadius: "5px",
                        boxShadow: "0px 0px 10px 0px #f9f9f9",
                      }}
                      id="checkbox"
                      type="checkbox"
                      onChange={selectAllHandle}
                    />
                  </div>
                  <div className="flex justify-center text-center ml-2 mt-0.5">
                    {selectPrompt}
                  </div>
                </div>
                <div className="flex_box">
                  <div
                    className={` flex_item flex items-center justify-center m-1 ${
                      isSelected1 ? "selected" : ""
                    }`}
                  >
                    <button className="gis-button" onClick={handleButtonClick1}>
                      Drought
                    </button>
                  </div>
                  <div
                    className={` flex_item flex items-center justify-center m-1 ${
                      isSelected2 ? "selected" : ""
                    }`}
                  >
                    <button className="gis-button" onClick={handleButtonClick2}>
                      Earthquake
                    </button>
                  </div>
                </div>
                <div className="flex_box">
                  <div
                    className={` flex_item flex items-center justify-center m-1 ${
                      isSelected3 ? "selected" : ""
                    }`}
                  >
                    <button className="gis-button" onClick={handleButtonClick3}>
                      Winds
                    </button>
                  </div>
                  <div
                    className={` flex_item flex items-center justify-center m-1 ${
                      isSelected4 ? "selected" : ""
                    }`}
                  >
                    <button className="gis-button" onClick={handleButtonClick4}>
                      Rainfall
                    </button>
                  </div>
                </div>
                <div className="flex_box">
                  <div
                    className={` flex_item flex items-center justify-center m-1 ${
                      isSelected5 ? "selected" : ""
                    }`}
                  >
                    <button className="gis-button" onClick={handleButtonClick5}>
                      Floods
                    </button>
                  </div>
                  <div
                    className={` flex_item flex items-center justify-center m-1 ${
                      isSelected6 ? "selected" : ""
                    }`}
                  >
                    <button className="gis-button" onClick={handleButtonClick6}>
                      Snow
                    </button>
                  </div>
                </div>
                <div className="flex_box">
                  <div
                    className={` flex_item flex items-center justify-center m-1 ${
                      isSelected7 ? "selected" : ""
                    }`}
                  >
                    <button className="gis-button" onClick={handleButtonClick7}>
                      HeatWave
                    </button>
                  </div>
                  <div
                    className={` flex_item flex items-center justify-center m-1 ${
                      isSelected8 ? "selected" : ""
                    }`}
                  >
                    <button className="gis-button" onClick={handleButtonClick8}>
                      Cylone
                    </button>
                  </div>
                </div>
                <div className="flex_box">
                  <div
                    className={` flex_item flex items-center justify-center m-1 ${
                      isSelected9 ? "selected" : ""
                    }`}
                  >
                    <button className="gis-button" onClick={handleButtonClick9}>
                      HailStorm
                    </button>
                  </div>
                  <div
                    className={` flex_item flex items-center justify-center m-1 ${
                      isSelected10 ? "selected" : ""
                    }`}
                  >
                    <button
                      className="gis-button"
                      onClick={handleButtonClick10}
                    >
                      Locust Attack
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="mt-4"
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  margin: "10px",
                  boxShadow: "0px 0px 10px 0px #f9f9f9",
                }}
              >
                <div className="flex items-center justify-center m-1 text-xl font-semibold">
                  <p
                    className="flex items-center justify-center p-2"
                    style={{
                      width: "100%",
                      backgroundColor: "#afdbba",
                      borderRadius: "10px",
                      margin: "10px",
                      boxShadow: "0px 0px 10px 0px rgb(230, 230, 230)",
                    }}
                  >
                    Interval
                  </p>
                </div>
                <div className="flex_box">
                  <div
                    className={` flex_item flex items-center justify-center m-1 ${
                      isSelected12 ? "selected" : ""
                    }`}
                  >
                    <button
                      className="gis-button"
                      onClick={handleButtonClick12}
                    >
                      Year
                    </button>
                  </div>
                  {/*
                  <div
                    className={` flex_item flex items-center justify-center m-1 ${
                      isSelected10 ? "selected" : ""
                    }`}
                  >
                    <button
                      className="gis-button"
                      onClick={handleButtonClick10}
                    >
                      Month
                    </button>
                  </div>*/}
                </div>
              </div>

              <div className="flex items-center justify-center m-1 text-xl font-semibold">
                <p
                  className="flex items-center justify-center p-2"
                  style={{
                    width: "100%",
                    backgroundColor: "#afdbba",
                    borderRadius: "10px",
                    margin: "10px",
                    boxShadow: "0px 0px 10px 0px #f9f9f9",
                  }}
                >
                  TimeScroll
                </p>
              </div>
              {/*
              <div
                id="disabled-month"
                className="flex items-center justify-center mt-2 mb-4"
              >
                <button
                  id="prevMonth"
                  className=" gis-button"
                  onClick={prevSlideMonth}
                >
                  &#10094;Prev
                </button>
                <span className="ml-2 mr-2">{Month[monthcounter]}</span>
                <button
                  id="nextMonth"
                  className=" gis-button"
                  onClick={nextSlideMonth}
                >
                  Next&#10095;
                </button>
                </div>*/}
              <div
                id="disabled-year"
                className="flex items-center justify-center mt-2 mb-4"
              >
                <button id="prev" className=" gis-button" onClick={prevSlide}>
                  &#10094;Prev
                </button>
                <span className="ml-2 mr-2">{timecounter}</span>
                <button id="next" className=" gis-button" onClick={nextSlide}>
                  Next&#10095;
                </button>
              </div>
            </div>
            <div id="map-gis" className="flex justify-center items-center">
              <Map flag={gisflag} data={mapsData} feature={feature}></Map>
            </div>
          </div>
          <div id="info_box_show" className="bor flex_box ml-4 mr-8 mb-4">
            <div className="bor flex justify-center text-center text-3xl flex_item">
              <img src="" alt="Image" />
            </div>
            <div className="bor flex_item">
              <div className="bor justify-center text-center">Title</div>
              <div className="bor flex">
                <div className="bor justify-center text-center flex_item">
                  Category
                </div>
                <div className="bor justify-center text-center flex_item">
                  Location
                </div>
              </div>
              <div className="bor">
                <div className="bor">Description</div>
                <div>References</div>
              </div>
            </div>
          </div>
          <div
            className="pt-8 pl-12 flex_box"
            style={{
              fontSize: "25px",
              backgroundColor: "#f8f9fb",
              fontWeight: 800,
              marginBottom: "2%",
            }}
          >
            <div
              style={{
                border: "3px solid #2d5b40",
                borderRadius: "10px",
                width: "5px",
                marginRight: "5px",
                height: "35px",
              }}
            ></div>
            <div>Extreme Events Predictor</div>
          </div>
          <div className="bor flex_box ml-4 mr-8 mb-4">
            <div className="bor flex justify-center text-center text-3xl flex_item">
              <img src="" alt="Image" />
            </div>
            <div className="bor flex_item">
              <div className="bor justify-center text-center">Title</div>
              <div className="bor flex">
                <div className="bor justify-center text-center flex_item">
                  Category
                </div>
                <div className="bor justify-center text-center flex_item">
                  Location
                </div>
              </div>
              <div className="bor">
                <div className="bor">Description</div>
                <div>References</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex justify-center items-center pt-72">
          <Loader></Loader>{" "}
        </div>
      </>
    );
  }
}
