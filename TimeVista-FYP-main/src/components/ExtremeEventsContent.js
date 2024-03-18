import React, { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Map from "./Maps.js";

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
  const [timecounter, setTimecounter] = useState(1980);
  const [isSelected1, setIsSelected1] = useState(false);
  const [isSelected2, setIsSelected2] = useState(false);
  const [isSelected3, setIsSelected3] = useState(false);
  const [isSelected4, setIsSelected4] = useState(false);
  const [isSelected5, setIsSelected5] = useState(false);
  const [isSelected6, setIsSelected6] = useState(false);
  const [isSelected9, setIsSelected9] = useState(false);
  const [isSelected10, setIsSelected10] = useState(false);
  const [isSelected11, setIsSelected11] = useState(false);
  const [gisflag, setGisflag] = useState(0);
  const [scrollData, setScrollData] = useState([]);
  const [arrowData, setArrowData] = useState([]);
  const [feature, setFeature] = useState(0);
  const [time, setTime] = useState(0);
  const [monthcounter, setMonthcounter] = useState(0);

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
      DataFetchGISLayer();
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
      DataFetchGISLayer();
    }, 0);
  };

  const fetchData = async (Reqobj) => {
    let scrollObj = [];
    try {
      const response = await fetch("http://localhost:5000/api/gisLayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Reqobj),
      });
      const responseData = await response.json();

      setArrowData(responseData);
      console.log("City: ", responseData);

      if (feature === 1) {
        for (let i = 1; i < responseData.length; i++) {
          scrollObj.push({
            type: "Feature",
            properties: {
              city: responseData[i].City,
              population: responseData[i].Temperature,
            },
            geometry: {
              type: "Point",
              coordinates: responseData[i].coordinates,
            },
          });
        }
      } else if (feature === 2) {
        for (let i = 1; i < responseData.length; i++) {
          scrollObj.push({
            type: "Feature",
            properties: {
              city: responseData[i].City,
              population: responseData[i].RainFall,
            },
            geometry: {
              type: "Point",
              coordinates: responseData[i].coordinates,
            },
          });
        }
      } else if (feature === 3) {
        for (let i = 1; i < responseData.length; i++) {
          scrollObj.push({
            type: "Feature",
            properties: {
              city: responseData[i].City,
              population: responseData[i].Humidity,
            },
            geometry: {
              type: "Point",
              coordinates: responseData[i].coordinates,
            },
          });
        }
      } else if (feature === 4) {
        for (let i = 1; i < responseData.length; i++) {
          scrollObj.push({
            type: "Feature",
            properties: {
              city: responseData[i].City,
              population: responseData[i].Pressure,
            },
            geometry: {
              type: "Point",
              coordinates: responseData[i].coordinates,
            },
          });
        }
      } else if (feature === 5) {
        for (let i = 1; i < responseData.length; i++) {
          scrollObj.push({
            type: "Feature",
            properties: {
              city: responseData[i].City,
              population: responseData[i].WindSpeed,
            },
            geometry: {
              type: "Point",
              coordinates: responseData[i].coordinates,
            },
          });
        }
      } else if (feature === 6) {
        for (let i = 1; i < responseData.length; i++) {
          scrollObj.push({
            type: "Feature",
            properties: {
              city: responseData[i].City,
              population: responseData[i].Smog,
            },
            geometry: {
              type: "Point",
              coordinates: responseData[i].coordinates,
            },
          });
        }
      }

      setScrollData({
        type: "FeatureCollection",
        features: scrollObj,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setGisflag(1);
    }
  };

  const DataFetchGISLayer = () => {
    setGisflag(0);
    if (isSelected1 === true) setFeature(1);
    else if (isSelected2 === true) setFeature(2);
    else if (isSelected3 === true) setFeature(3);
    else if (isSelected4 === true) setFeature(4);
    else if (isSelected5 === true) setFeature(5);
    else if (isSelected6 === true) setFeature(6);
    if (isSelected9 === true) setTime(1);
    else if (isSelected10 === true) setTime(2);
    else if (isSelected11 === true) setTime(3);

    let Reqobj = {
      feature: feature,
      time: time,
      year: timecounter,
    };

    fetchData(Reqobj);
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

  const handleButtonClick9 = () => {
    setIsSelected9(!isSelected9); // Toggle isSelected state
    setIsSelected10(false);
    setIsSelected11(false);
    if (!isSelected9) {
      document.getElementById("disabled-year").style.pointerEvents = "all";
      document.getElementById("disabled-year").style.opacity = "1";
      document.getElementById("disabled-month").style.pointerEvents = "none";
      document.getElementById("disabled-month").style.opacity = "0.5";
    } else {
      document.getElementById("disabled-year").style.pointerEvents = "none";
      document.getElementById("disabled-year").style.opacity = "0.5";
      document.getElementById("disabled-month").style.pointerEvents = "none";
      document.getElementById("disabled-month").style.opacity = "0.5";
    }
  };

  const handleButtonClick10 = () => {
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
  };

  return (
    <>
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
                    isSelected9 ? "selected" : ""
                  }`}
                >
                  <button className="gis-button" onClick={handleButtonClick9}>
                    Year
                  </button>
                </div>
                <div
                  className={` flex_item flex items-center justify-center m-1 ${
                    isSelected10 ? "selected" : ""
                  }`}
                >
                  <button className="gis-button" onClick={handleButtonClick10}>
                    Month
                  </button>
                </div>
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
            </div>
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
          <div id="map-gis">
            <Map flag={gisflag} data={scrollData} feature={feature}></Map>
          </div>
        </div>
      </div>
    </>
  );
}
