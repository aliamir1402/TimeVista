import React, { useEffect, useState } from "react";
import CropMap from "../components/cropMaps";
import Header from "./header";
import Footer from "./footer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loader from "../components/loader";

export default function Crops() {
  const [LoadingFlag, setLoadingFlag] = useState(0);
  const [crop, setCrop] = React.useState("Cotton");
  const [metric, setMetric] = React.useState("Crop Yield ('000 Tonnes)");
  const [year, setYear] = React.useState("2010");
  const [metricArray, setMetricArray] = React.useState([
    "Area Covered ('000 Acres)",
    "Crop Yield ('000 Tonnes)",
    "Avg Crop Yield (Ton/Acre)",
  ]);
  const [metricName, setMetricName] = React.useState([
    "Area Covered ('000 Acres)",
    "Crop Yield ('000 Tonnes)",
    "Avg Crop Yield (Ton/Acre)",
  ]);
  const [couneter, setCouneter] = React.useState([0, 1, 2]);

  const [cropArray, setCropArray] = React.useState([
    "Cotton",
    "Maize",
    "Rice",
    "Sugarcane",
    "Wheat",
  ]);
  const [yearArray, setYearArray] = useState([]);
  const [CropGISData, setCropGISData] = useState({});
  const [count, setCount] = useState(2024);

  useEffect(() => {
    setTimeout(() => {
      setLoadingFlag(1);
    }, 2000);
  }, []);

  useEffect(() => {
    let array = [];
    if (yearArray.length === 0) {
      for (var i = 1983; i < count; i++) {
        array.push(i);
      }
      console.log(array);
      setYearArray(array);
    }
  }, []);

  const handleCropChange = (event) => {
    setCrop(event.target.value);
  };

  const handleMetricChange = (event) => {
    setMetric(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    console.log(crop);
  }, [crop]);

  useEffect(() => {
    console.log(metric);
  }, [metric]);

  useEffect(() => {
    console.log(year);
  }, [year]);

  useEffect(() => {
    console.log(yearArray);
  }, [yearArray]);

  const CropDataFetch = async () => {
    let DataObj = {
      Crop: crop,
      Type: metric,
      Year: year,
    };
    if (DataObj.Crop === "" || DataObj.Type === "" || DataObj.Year === "") {
      document.getElementById("msg-promt").innerText =
        "Please Select All Options";
      document.getElementById("msg-promt").style.backgroundColor = "#ff2828";
      document.getElementById("msg-promt").style.display = "block";
      setTimeout(() => {
        document.getElementById("msg-promt").style.display = "none";
      }, 3500);
      return;
    } else {
      document.getElementById("msg-promt").innerText = "Request Send...";
      document.getElementById("msg-promt").style.backgroundColor = "#28ffb7";
      document.getElementById("msg-promt").style.display = "block";
      setTimeout(() => {
        document.getElementById("msg-promt").style.display = "none";
      }, 3500);
    }

    const response = await fetch("http://localhost:4000/api/crop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DataObj),
    });
    const responseData = await response.json();
    setCropGISData(responseData);
  };

  useEffect(() => {
    console.log(CropGISData);
  }, [CropGISData]);

  // Check if an item exists in local storage
  function isLocalStorageItemExists(key) {
    return localStorage.getItem(key) !== null;
  }
  var name = "",
    flag = 0;
  // Example usage
  const itemName = "username"; // Replace with the name of the item you want to check
  const exists = isLocalStorageItemExists(itemName);

  if (exists) {
    flag = 1;
    name = localStorage.getItem(itemName);
  } else {
    flag = 0;
  }

  if (LoadingFlag) {
    return (
      <>
        <div
          style={{
            background: "linear-gradient(to right,#12251e,#274137)",
            color: "white",
            borderBottom: "10px solid",
            borderImage:
              "linear-gradient(90deg, #719b5c, #23634b, #23634c6b, #00000067) 1",
          }}
        >
          <Header />
        </div>
        <div className="welcome-box-analytics mt-4 mb-4">
          <div className="text-md font-normal">Welcome, {name}</div>
          <div className="text-3xl font-bold">
            Crop Yield{" "}
            <span className="text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text font-bold text-3xl">
              Dashboard
            </span>
          </div>
        </div>
        <div
          id="crops-content"
          style={{
            borderTop: "10px solid",
            borderImage:
              "linear-gradient(90deg, #719b5c, #23634b, #23634c6b, #00000067) 1",
          }}
        >
          <CropMap Data={CropGISData} />
          <div id="overlay-content-1">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel
                id="demo-select-small-label"
                style={{ fontFamily: "Overpass", fontWeight: 600 }}
              >
                Crop
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={crop}
                label="Crop"
                onChange={handleCropChange}
                className="select-overlay-content"
              >
                <MenuItem
                  value=""
                  style={{ fontFamily: "Overpass", fontWeight: 500 }}
                >
                  <em>None</em>
                </MenuItem>
                {cropArray.map((val) => (
                  <MenuItem
                    key={val} // Unique key for each MenuItem
                    value={val} // Dynamic value based on 'val' from yearArray
                  >
                    <span style={{ fontFamily: "Overpass", fontWeight: 500 }}>
                      {val}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div id="overlay-content-2">
            <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
              <InputLabel
                id="demo-select-small-label"
                style={{ fontFamily: "Overpass", fontWeight: 600 }}
              >
                Metric
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={metric}
                label="Metric"
                onChange={handleMetricChange}
                className="select-overlay-content"
              >
                <MenuItem
                  value=""
                  style={{ fontFamily: "Overpass", fontWeight: 500 }}
                >
                  <em>None</em>
                </MenuItem>
                {couneter.map((val) => (
                  <MenuItem
                    key={metricArray[val]} // Unique key for each MenuItem
                    value={metricArray[val]} // Dynamic value based on 'val' from yearArray
                  >
                    <span style={{ fontFamily: "Overpass", fontWeight: 500 }}>
                      {metricName[val]}
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div id="overlay-content-3">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel
                id="demo-select-small-label"
                style={{ fontFamily: "Overpass", fontWeight: 600 }}
              >
                Year
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={year}
                label="Year"
                onChange={handleYearChange}
                className="select-overlay-content"
              >
                <MenuItem
                  value=""
                  style={{ fontFamily: "Overpass", fontWeight: 500 }}
                >
                  <em>None</em>
                </MenuItem>

                {yearArray.map((val) => (
                  <MenuItem
                    key={val} // Unique key for each MenuItem
                    value={val} // Dynamic value based on 'val' from yearArray
                  >
                    <span style={{ fontFamily: "Overpass", fontWeight: 500 }}>
                      {val}
                    </span>
                  </MenuItem>
                ))}
                <MenuItem
                  class="future-reading"
                  key={count} // Unique key for each MenuItem
                  value={count} // Dynamic value based on 'val' from yearArray
                >
                  <span style={{ fontFamily: "Overpass", fontWeight: 500 }}>
                    {count}
                  </span>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div id="overlay-content-4">
            <button onClick={CropDataFetch} className="fetch-button">
              Fetch
            </button>
          </div>
          <div id="overlay-content-5">
            <div id="msg-promt">Fetch</div>
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex justify-center items-center pt-72">
          <Loader></Loader>
        </div>
      </>
    );
  }
}