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
  const [crop, setCrop] = React.useState("");
  const [metric, setMetric] = React.useState("");
  const [year, setYear] = React.useState("");
  const [metricArray, setMetricArray] = React.useState([
    "Area Covered (Acres)",
    "Crop Yield (Kg)",
    "Avg Crop Yield (Kg/Acre)",
  ]);
  const [cropArray, setCropArray] = React.useState([
    "Cotton",
    "Maize",
    "Rice",
    "Sugarcane",
    "Wheat",
  ]);
  const [yearArray, setYearArray] = useState([]);
  const [CropGISData, setCropGISData] = useState({});
  const [count, setCount] = useState(2020);

  useEffect(() => {
    setTimeout(() => {
      setLoadingFlag(1);
    }, 2000);
  }, []);

  useEffect(() => {
    let array = [];
    if (yearArray.length === 0) {
      for (var i = 1980; i < count; i++) {
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

    const response = await fetch("http://localhost:5000/api/crop", {
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
        <div id="crops-content">
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
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
                {metricArray.map((val) => (
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
