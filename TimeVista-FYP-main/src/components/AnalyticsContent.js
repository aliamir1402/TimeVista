<<<<<<< HEAD
import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Feature1 from "./Temperature.js";
import Feature2 from "./RainFall.js";
import Feature3 from "./Humidity.js";
import Feature4 from "./Pressure.js";
import Feature5 from "./Wind.js";
import Feature6 from "./Smog.js";
import Map from "./GISMap.js";
import TempIcon from "../components/images/icons8-temperature-80.png";
import RainFallIcon from "../components/images/icons8-rainfall-96.png";
import HumidityIcon from "../components/images/icons8-humidity-80.png";
import SmogIcon from "../components/images/icons8-co2-cloud-64.png";
import WindIcon from "../components/images/icons8-wind-96.png";
import PressureIcon from "../components/images/icons8-pressure-96.png";

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
  const [feature, setFeature] = useState("");
  const [time, setTime] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const prevSlide = () => {
    let scrollObj = [];
    if (timecounter - 1 < 1980) {
      setTimecounter(timecounter);
      document.getElementById("prev").disabled = true;
      document.getElementById("next").disabled = false;
    } else {
      setTimecounter(timecounter - 1);
      document.getElementById("next").disabled = false;
    }

    if (feature === 1) {
      for (let i = 0; i < 1; i++) {
        scrollObj.push({
          type: "Feature",
          properties: {
            city: arrowData[timecounter - 1980].City,
            population: arrowData[timecounter - 1980].Temperature,
          },
          geometry: {
            type: "Point",
            coordinates: arrowData[timecounter - 1980].coordinates,
          },
        });
      }
    } else {
    }

    setScrollData({
      type: "FeatureCollection",
      features: scrollObj,
    });
  };

  const nextSlide = () => {
    let scrollObj = [];
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

    if (feature === 1) {
      for (let i = 0; i < 1; i++) {
        scrollObj.push({
          type: "Feature",
          properties: {
            city: arrowData[timecounter - 1980].City,
            population: arrowData[timecounter - 1980].Temperature,
          },
          geometry: {
            type: "Point",
            coordinates: arrowData[timecounter - 1980].coordinates,
          },
        });
      }
    } else {
    }

    setScrollData({
      type: "FeatureCollection",
      features: scrollObj,
    });
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
      console.log("Timer: ", responseData);
      setArrowData(responseData);
      if (Reqobj.feature === 1) {
        for (let i = 0; i < 1; i++) {
          scrollObj.push({
            type: "Feature",
            properties: {
              city: responseData[timecounter - 1980].City,
              population: responseData[timecounter - 1980].Temperature,
            },
            geometry: {
              type: "Point",
              coordinates: responseData[timecounter - 1980].coordinates,
            },
          });
        }
      } else {
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
    let feature = 0,
      time = 0;

    if (isSelected1 === true) feature = 1;
    else if (isSelected2 === true) feature = 2;
    else if (isSelected3 === true) feature = 3;
    else if (isSelected4 === true) feature = 4;
    else if (isSelected5 === true) feature = 5;
    else if (isSelected6 === true) feature = 6;
    if (isSelected9 === true) time = 1;
    else if (isSelected10 === true) time = 2;
    else if (isSelected11 === true) time = 3;

    let Reqobj = {
      feature: feature,
      time: time,
    };
    setFeature(feature);
    setTime(time);
    fetchData(Reqobj);
  };

  const handleButtonClick1 = () => {
    setIsSelected1(!isSelected1); // Toggle isSelected state
    setIsSelected2(false);
    setIsSelected3(false);
    setIsSelected4(false);
    setIsSelected5(false);
    setIsSelected6(false);
  };
  const handleButtonClick2 = () => {
    setIsSelected2(!isSelected2); // Toggle isSelected state
    setIsSelected1(false);
    setIsSelected3(false);
    setIsSelected4(false);
    setIsSelected5(false);
    setIsSelected6(false);
  };
  const handleButtonClick3 = () => {
    setIsSelected3(!isSelected3); // Toggle isSelected state
    setIsSelected2(false);
    setIsSelected1(false);
    setIsSelected4(false);
    setIsSelected5(false);
    setIsSelected6(false);
  };
  const handleButtonClick4 = () => {
    setIsSelected4(!isSelected4); // Toggle isSelected state
    setIsSelected2(false);
    setIsSelected3(false);
    setIsSelected1(false);
    setIsSelected5(false);
    setIsSelected6(false);
  };
  const handleButtonClick5 = () => {
    setIsSelected5(!isSelected5); // Toggle isSelected state
    setIsSelected2(false);
    setIsSelected3(false);
    setIsSelected4(false);
    setIsSelected1(false);
    setIsSelected6(false);
  };
  const handleButtonClick6 = () => {
    setIsSelected6(!isSelected6); // Toggle isSelected state
    setIsSelected2(false);
    setIsSelected3(false);
    setIsSelected4(false);
    setIsSelected5(false);
    setIsSelected1(false);
  };

  const handleButtonClick9 = () => {
    setIsSelected9(!isSelected9); // Toggle isSelected state
    setIsSelected10(false);
    setIsSelected11(false);
  };
  const handleButtonClick10 = () => {
    setIsSelected10(!isSelected10); // Toggle isSelected state
    setIsSelected9(false);
    setIsSelected11(false);
  };
  const handleButtonClick11 = () => {
    setIsSelected11(!isSelected11); // Toggle isSelected state
    setIsSelected9(false);
    setIsSelected10(false);
  };

  return (
    <>
      <div className="analytics-main">
        <div className="welcome-box-analytics">
          <div className="text-md font-normal">Welcome, {name}</div>
          <div className="text-3xl font-bold">
            Analytics{" "}
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
          <div>Climate GIS Layer</div>
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
                  Variable
                </p>
              </div>
              <div className="flex_box">
                <div
                  className={` flex_item flex items-center justify-center m-1 ${
                    isSelected1 ? "selected" : ""
                  }`}
                >
                  <button className="gis-button" onClick={handleButtonClick1}>
                    Temperature
                  </button>
                </div>
                <div
                  className={` flex_item flex items-center justify-center m-1 ${
                    isSelected2 ? "selected" : ""
                  }`}
                >
                  <button className="gis-button" onClick={handleButtonClick2}>
                    RainFall
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
                    Humidity
                  </button>
                </div>
                <div
                  className={` flex_item flex items-center justify-center m-1 ${
                    isSelected4 ? "selected" : ""
                  }`}
                >
                  <button className="gis-button" onClick={handleButtonClick4}>
                    Pressure
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
                    Wind
                  </button>
                </div>
                <div
                  className={` flex_item flex items-center justify-center m-1 ${
                    isSelected6 ? "selected" : ""
                  }`}
                >
                  <button className="gis-button" onClick={handleButtonClick6}>
                    Smog
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
              <div className="flex_box">
                <div
                  className={`flex_item flex items-center justify-center m-1 ${
                    isSelected11 ? "selected" : ""
                  }`}
                >
                  <button className="gis-button" onClick={handleButtonClick11}>
                    Daily
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end mr-6">
              <button
                className="time-stamps-button"
                onClick={DataFetchGISLayer}
              >
                Fetch
              </button>
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

            <div className="flex items-center justify-center mt-2 mb-4">
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
            <Map flag={gisflag} data={scrollData}></Map>
          </div>
        </div>

        <div
          id="title-analytics"
          className="pl-12 flex_box"
          style={{
            fontSize: "25px",
            backgroundColor: "#f8f9fb",
            fontWeight: 800,
          }}
        >
          <div
            className="bor"
            style={{
              border: "3px solid #ff9800",
              borderRadius: "10px",
              width: "5px",
              marginRight: "5px",
              height: "35px",
            }}
          ></div>
          <div>Climate Analytics Layer</div>
        </div>
        <Box id="tabs-box">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 0, borderColor: "divider" }}
          >
            <Tab
              icon={
                <div className="icon-style">
                  <img src={TempIcon} alt="TempIcon" width={40} height={40} />
                </div>
              }
              {...a11yProps(0)}
            />
            <Tab
              icon={
                <div className="icon-style">
                  <img
                    src={RainFallIcon}
                    alt="RainFallIcon"
                    width={40}
                    height={40}
                  />
                </div>
              }
              {...a11yProps(1)}
            />
            <Tab
              icon={
                <div className="icon-style">
                  <img
                    src={HumidityIcon}
                    alt="HumidityIcon"
                    width={40}
                    height={40}
                  />
                </div>
              }
              {...a11yProps(2)}
            />
            <Tab
              icon={
                <div className="icon-style">
                  <img
                    src={PressureIcon}
                    alt="PressureIcon"
                    width={40}
                    height={40}
                  />
                </div>
              }
              {...a11yProps(3)}
            />
            <Tab
              icon={
                <div className="icon-style">
                  <img src={WindIcon} alt="SmogIcon" width={40} height={40} />
                </div>
              }
              {...a11yProps(4)}
            />
            <Tab
              icon={
                <div className="icon-style">
                  <img src={SmogIcon} alt="WindIcon" width={40} height={40} />
                </div>
              }
              {...a11yProps(5)}
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Feature1 />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Feature2 />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Feature3 />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Feature4 />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Feature5 />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Feature6 />
          </TabPanel>
        </Box>
      </div>
    </>
  );
}
=======
import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Feature1 from "./Temperature.js";
import Feature2 from "./RainFall.js";
import Feature3 from "./Humidity.js";
import Feature4 from "./Pressure.js";
import Feature5 from "./Wind.js";
import Feature6 from "./Smog.js";
import Map from "./GISMap.js";
import TempIcon from "../components/images/icons8-temperature-80.png";
import RainFallIcon from "../components/images/icons8-rainfall-96.png";
import HumidityIcon from "../components/images/icons8-humidity-80.png";
import SmogIcon from "../components/images/icons8-co2-cloud-64.png";
import WindIcon from "../components/images/icons8-wind-96.png";
import PressureIcon from "../components/images/icons8-pressure-96.png";

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
  const [feature, setFeature] = useState("");
  const [time, setTime] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const prevSlide = () => {
    let scrollObj = [];
    if (timecounter - 1 < 1980) {
      setTimecounter(timecounter);
      document.getElementById("prev").disabled = true;
      document.getElementById("next").disabled = false;
    } else {
      setTimecounter(timecounter - 1);
      document.getElementById("next").disabled = false;
    }

    if (feature === 1) {
      for (let i = 0; i < 1; i++) {
        scrollObj.push({
          type: "Feature",
          properties: {
            city: arrowData[timecounter - 1980].City,
            population: arrowData[timecounter - 1980].Temperature,
          },
          geometry: {
            type: "Point",
            coordinates: arrowData[timecounter - 1980].coordinates,
          },
        });
      }
    } else {
    }

    setScrollData({
      type: "FeatureCollection",
      features: scrollObj,
    });
  };

  const nextSlide = () => {
    let scrollObj = [];
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

    if (feature === 1) {
      for (let i = 0; i < 1; i++) {
        scrollObj.push({
          type: "Feature",
          properties: {
            city: arrowData[timecounter - 1980].City,
            population: arrowData[timecounter - 1980].Temperature,
          },
          geometry: {
            type: "Point",
            coordinates: arrowData[timecounter - 1980].coordinates,
          },
        });
      }
    } else {
    }

    setScrollData({
      type: "FeatureCollection",
      features: scrollObj,
    });
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
      console.log("Timer: ", responseData);
      setArrowData(responseData);
      if (Reqobj.feature === 1) {
        for (let i = 0; i < 1; i++) {
          scrollObj.push({
            type: "Feature",
            properties: {
              city: responseData[timecounter - 1980].City,
              population: responseData[timecounter - 1980].Temperature,
            },
            geometry: {
              type: "Point",
              coordinates: responseData[timecounter - 1980].coordinates,
            },
          });
        }
      } else {
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
    let feature = 0,
      time = 0;

    if (isSelected1 === true) feature = 1;
    else if (isSelected2 === true) feature = 2;
    else if (isSelected3 === true) feature = 3;
    else if (isSelected4 === true) feature = 4;
    else if (isSelected5 === true) feature = 5;
    else if (isSelected6 === true) feature = 6;
    if (isSelected9 === true) time = 1;
    else if (isSelected10 === true) time = 2;
    else if (isSelected11 === true) time = 3;

    let Reqobj = {
      feature: feature,
      time: time,
    };
    setFeature(feature);
    setTime(time);
    fetchData(Reqobj);
  };

  const handleButtonClick1 = () => {
    setIsSelected1(!isSelected1); // Toggle isSelected state
    setIsSelected2(false);
    setIsSelected3(false);
    setIsSelected4(false);
    setIsSelected5(false);
    setIsSelected6(false);
  };
  const handleButtonClick2 = () => {
    setIsSelected2(!isSelected2); // Toggle isSelected state
    setIsSelected1(false);
    setIsSelected3(false);
    setIsSelected4(false);
    setIsSelected5(false);
    setIsSelected6(false);
  };
  const handleButtonClick3 = () => {
    setIsSelected3(!isSelected3); // Toggle isSelected state
    setIsSelected2(false);
    setIsSelected1(false);
    setIsSelected4(false);
    setIsSelected5(false);
    setIsSelected6(false);
  };
  const handleButtonClick4 = () => {
    setIsSelected4(!isSelected4); // Toggle isSelected state
    setIsSelected2(false);
    setIsSelected3(false);
    setIsSelected1(false);
    setIsSelected5(false);
    setIsSelected6(false);
  };
  const handleButtonClick5 = () => {
    setIsSelected5(!isSelected5); // Toggle isSelected state
    setIsSelected2(false);
    setIsSelected3(false);
    setIsSelected4(false);
    setIsSelected1(false);
    setIsSelected6(false);
  };
  const handleButtonClick6 = () => {
    setIsSelected6(!isSelected6); // Toggle isSelected state
    setIsSelected2(false);
    setIsSelected3(false);
    setIsSelected4(false);
    setIsSelected5(false);
    setIsSelected1(false);
  };

  const handleButtonClick9 = () => {
    setIsSelected9(!isSelected9); // Toggle isSelected state
    setIsSelected10(false);
    setIsSelected11(false);
  };
  const handleButtonClick10 = () => {
    setIsSelected10(!isSelected10); // Toggle isSelected state
    setIsSelected9(false);
    setIsSelected11(false);
  };
  const handleButtonClick11 = () => {
    setIsSelected11(!isSelected11); // Toggle isSelected state
    setIsSelected9(false);
    setIsSelected10(false);
  };

  return (
    <>
      <div className="analytics-main">
        <div className="welcome-box-analytics">
          <div className="text-md font-normal">Welcome, {name}</div>
          <div className="text-3xl font-bold">
            Analytics{" "}
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
          <div>Climate GIS Layer</div>
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
                  Variable
                </p>
              </div>
              <div className="flex_box">
                <div
                  className={` flex_item flex items-center justify-center m-1 ${
                    isSelected1 ? "selected" : ""
                  }`}
                >
                  <button className="gis-button" onClick={handleButtonClick1}>
                    Temperature
                  </button>
                </div>
                <div
                  className={` flex_item flex items-center justify-center m-1 ${
                    isSelected2 ? "selected" : ""
                  }`}
                >
                  <button className="gis-button" onClick={handleButtonClick2}>
                    RainFall
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
                    Humidity
                  </button>
                </div>
                <div
                  className={` flex_item flex items-center justify-center m-1 ${
                    isSelected4 ? "selected" : ""
                  }`}
                >
                  <button className="gis-button" onClick={handleButtonClick4}>
                    Pressure
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
                    Wind
                  </button>
                </div>
                <div
                  className={` flex_item flex items-center justify-center m-1 ${
                    isSelected6 ? "selected" : ""
                  }`}
                >
                  <button className="gis-button" onClick={handleButtonClick6}>
                    Smog
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
              <div className="flex_box">
                <div
                  className={`flex_item flex items-center justify-center m-1 ${
                    isSelected11 ? "selected" : ""
                  }`}
                >
                  <button className="gis-button" onClick={handleButtonClick11}>
                    Daily
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end mr-6">
              <button
                className="time-stamps-button"
                onClick={DataFetchGISLayer}
              >
                Fetch
              </button>
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

            <div className="flex items-center justify-center mt-2 mb-4">
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
            <Map flag={gisflag} data={scrollData}></Map>
          </div>
        </div>

        <div
          id="title-analytics"
          className="pl-12 flex_box"
          style={{
            fontSize: "25px",
            backgroundColor: "#f8f9fb",
            fontWeight: 800,
          }}
        >
          <div
            className="bor"
            style={{
              border: "3px solid #ff9800",
              borderRadius: "10px",
              width: "5px",
              marginRight: "5px",
              height: "35px",
            }}
          ></div>
          <div>Climate Analytics Layer</div>
        </div>
        <Box id="tabs-box">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 0, borderColor: "divider" }}
          >
            <Tab
              icon={
                <div className="icon-style">
                  <img src={TempIcon} alt="TempIcon" width={40} height={40} />
                </div>
              }
              {...a11yProps(0)}
            />
            <Tab
              icon={
                <div className="icon-style">
                  <img
                    src={RainFallIcon}
                    alt="RainFallIcon"
                    width={40}
                    height={40}
                  />
                </div>
              }
              {...a11yProps(1)}
            />
            <Tab
              icon={
                <div className="icon-style">
                  <img
                    src={HumidityIcon}
                    alt="HumidityIcon"
                    width={40}
                    height={40}
                  />
                </div>
              }
              {...a11yProps(2)}
            />
            <Tab
              icon={
                <div className="icon-style">
                  <img
                    src={PressureIcon}
                    alt="PressureIcon"
                    width={40}
                    height={40}
                  />
                </div>
              }
              {...a11yProps(3)}
            />
            <Tab
              icon={
                <div className="icon-style">
                  <img src={WindIcon} alt="SmogIcon" width={40} height={40} />
                </div>
              }
              {...a11yProps(4)}
            />
            <Tab
              icon={
                <div className="icon-style">
                  <img src={SmogIcon} alt="WindIcon" width={40} height={40} />
                </div>
              }
              {...a11yProps(5)}
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Feature1 />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Feature2 />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Feature3 />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Feature4 />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Feature5 />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Feature6 />
          </TabPanel>
        </Box>
      </div>
    </>
  );
}
>>>>>>> 2e7c0252ff7f2f52cd831d3f8aebfbcb23cbfcde
