import React, { useState } from "react";
import SimpleAreaChart from "./charts/SimpleAreaChart.js";
import TempIcon from "./images/icons8-temperature-80.png";
import calender from "../components/images/calender.svg";

export default function Temperature() {
  const [CityList, setCityList] = useState([""]);
  const [selection1, setSelection1] = useState(0);
  const [selection2, setSelection2] = useState(0);
  const [selection3, setSelection3] = useState(0);
  const [selection4, setSelection4] = useState(0);
  const [selection5, setSelection5] = useState(0);
  const [selection6, setSelection6] = useState(0);
  const [selection7, setSelection7] = useState(0);
  const [selection8, setSelection8] = useState(0);

  const CitySelectionFunc = (event) => {
    let selectedRegion = event.target.value;
    if (selectedRegion === "ICT") {
      setCityList(["ISB-Islamabad"]);
    } else if (selectedRegion === "Punjab") {
      setCityList([
        "RWP-Rawalpindi",
        "LHR-Lahore",
        "FSB-Faisalabad",
        "MUL-Multan",
        "GWJ-Gujranwala",
      ]);
    } else if (selectedRegion === "Sindh") {
      setCityList([]);
    } else if (selectedRegion === "KPK") {
      setCityList(["AAW-Abbottabad", "MRD-Mardan", "SWT-Swat", "MGO-Mingaora"]);
    } else if (selectedRegion === "Balochistan") {
      setCityList([]);
    }
  };

  const FetchDataCityWiseFunc = async (Reqobj) => {
    try {
      const response = await fetch("http://localhost:5000/api/HistoryData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Reqobj),
      });
      const responseData = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  const TimeLapsesButtonFunc = () => {
    let ReqOBJ = {};
    let timestamp;
    let cityID;
    let feature;
    let days;

    if (selection1) {
      timestamp = 1;
      days = 1;
    } else if (selection2) {
      timestamp = 2;
      days = 7;
    } else if (selection3) {
      timestamp = 3;
      days = 30;
    } else if (selection4) {
      timestamp = 4;
      days = 365;
    } else if (selection5) {
      timestamp = 5;
      days = 5 * 365;
    } else if (selection6) {
      timestamp = 6;
      days = 10 * 365;
    } else if (selection7) {
      timestamp = 7;
      days = 25 * 365;
    } else if (selection8) {
      timestamp = 8;
      days = 0;
    }

    ReqOBJ = {
      city: cityID,
      feature: feature,
      timestamp: timestamp,
      days: days,
    };
    FetchDataCityWiseFunc(ReqOBJ);
  };

  const handleTimeSelection1 = () => {
    setSelection1(!selection1);
    setSelection2(0);
    setSelection3(0);
    setSelection4(0);
    setSelection5(0);
    setSelection6(0);
    setSelection7(0);
    setSelection8(0);
  };
  const handleTimeSelection2 = () => {
    setSelection2(!selection2);
    setSelection1(0);
    setSelection3(0);
    setSelection4(0);
    setSelection5(0);
    setSelection6(0);
    setSelection7(0);
    setSelection8(0);
  };
  const handleTimeSelection3 = () => {
    setSelection3(!selection3);
    setSelection1(0);
    setSelection2(0);
    setSelection4(0);
    setSelection5(0);
    setSelection6(0);
    setSelection7(0);
    setSelection8(0);
  };
  const handleTimeSelection4 = () => {
    setSelection4(!selection4);
    setSelection2(0);
    setSelection3(0);
    setSelection1(0);
    setSelection5(0);
    setSelection6(0);
    setSelection7(0);
    setSelection8(0);
  };
  const handleTimeSelection5 = () => {
    setSelection5(!selection1);
    setSelection2(0);
    setSelection3(0);
    setSelection4(0);
    setSelection1(0);
    setSelection6(0);
    setSelection7(0);
    setSelection8(0);
  };
  const handleTimeSelection6 = () => {
    setSelection6(!selection1);
    setSelection2(0);
    setSelection3(0);
    setSelection4(0);
    setSelection5(0);
    setSelection1(0);
    setSelection7(0);
    setSelection8(0);
  };
  const handleTimeSelection7 = () => {
    setSelection7(!selection1);
    setSelection2(0);
    setSelection3(0);
    setSelection4(0);
    setSelection5(0);
    setSelection6(0);
    setSelection1(0);
    setSelection8(0);
  };
  const handleTimeSelection8 = () => {
    setSelection8(!selection1);
    setSelection2(0);
    setSelection3(0);
    setSelection4(0);
    setSelection5(0);
    setSelection6(0);
    setSelection7(0);
    setSelection1(0);
  };

  return (
    <>
      <div className="mb-4 w-fit h-fit">
        <form class="max-w-sm mx-auto">
          <div className="flex">
            <div>
              <select
                id="states"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg rounded-r-none dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={CitySelectionFunc}
              >
                <option selected>Choose a Region</option>
                <option value="ICT">Islamabad</option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="KPK">KPK</option>
                <option value="Balochistan">Balochistan</option>
              </select>
            </div>
            <div class="flex">
              <select
                id="states"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-300 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={FetchDataCityWiseFunc}
              >
                <option selected>Choose a City</option>
                {CityList.map((city, index) => (
                  <option value={city.slice(0, 3)}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className="flex_box">
        <div
          className="mb-4 area-chart"
          style={{ boxShadow: "0px 0px 10px 0px rgb(230, 230, 230)" }}
        >
          <SimpleAreaChart
            feature="Temperature"
            TempIcon={TempIcon}
          ></SimpleAreaChart>
          <div className="flex_box flex justify-end p-4 pt-0">
            <div>
              <button
                onClick={handleTimeSelection1}
                className={` ${selection1 ? "selected" : "time-stamps-button"}`}
              >
                1D
              </button>
            </div>
            <div>
              <button
                onClick={handleTimeSelection2}
                className={` ${selection2 ? "selected" : "time-stamps-button"}`}
              >
                7D
              </button>
            </div>
            <div>
              <button
                onClick={handleTimeSelection3}
                className={` ${selection3 ? "selected" : "time-stamps-button"}`}
              >
                1M
              </button>
            </div>
            <div>
              <button
                onClick={handleTimeSelection4}
                className={` ${selection4 ? "selected" : "time-stamps-button"}`}
              >
                1Y
              </button>
            </div>
            <div>
              <button
                onClick={handleTimeSelection5}
                className={` ${selection5 ? "selected" : "time-stamps-button"}`}
              >
                5Y
              </button>
            </div>
            <div>
              <button
                onClick={handleTimeSelection6}
                className={` ${selection6 ? "selected" : "time-stamps-button"}`}
              >
                10Y
              </button>
            </div>
            <div>
              <button
                onClick={handleTimeSelection7}
                className={` ${selection7 ? "selected" : "time-stamps-button"}`}
              >
                25Y
              </button>
            </div>
            <div>
              <button
                onClick={handleTimeSelection8}
                className={` ${selection8 ? "selected" : "time-stamps-button"}`}
              >
                MAX
              </button>
            </div>
          </div>
        </div>

        <div
          className="p-6 ml-8 w-fit h-fit div-box-feature"
          style={{ boxShadow: "0px 0px 10px 0px rgb(230, 230, 230)" }}
        >
          <div className="p-2 bgcolor-feature-2 mb-4">
            <div className="name-box-feature-2 mb-4">Stats</div>
            <div className="name-box-feature-description-2">14.2 °C</div>
            <div className="name-box-feature-date-2 flex">
              <div className="">
                <img src={calender} alt="calender" height={20} width={20} />
              </div>
              <div className="name-box-feature-date-sub-2">Sep 28, 2018</div>
            </div>
          </div>

          <div
            className="p-2 bgcolor-feature-2 mb-4"
            style={{ backgroundColor: "#cdafdb" }}
          >
            <div
              className="name-box-feature-2"
              style={{ borderColor: "#be4ee0" }}
            >
              Stats
            </div>
            <div className="name-box-feature-description-2">18.2 °C</div>
            <div className="name-box-feature-date-2 flex">
              <div className="">
                <img src={calender} alt="calender" height={20} width={20} />
              </div>
              <div
                className="name-box-feature-date-sub-2"
                style={{ color: "#434343" }}
              >
                Sep 28, 2018
              </div>
            </div>
          </div>
          <div className="p-2 bgcolor-feature-1 mb-4">
            <div className="name-box-feature-1">Stats</div>
            <div className="name-box-feature-description-1">28.2 °C</div>
            <div className="name-box-feature-date-1 flex">
              <div className="">
                <img src={calender} alt="calender" height={20} width={20} />
              </div>
              <div className="name-box-feature-date-sub-1">Sep 28, 2018</div>
            </div>
          </div>
        </div>

        {/*
        <div className="flex_item p-4 flex_box">
          <div className="flex_item">
            <Tabs variant="soft-rounded" colorScheme="cyan">
              <TabList>
                <Tab>Insights</Tab>
                <Tab>ForeSights</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <InsightsBoxs></InsightsBoxs>
                </TabPanel>
                <TabPanel>
                  <Foresights></Foresights>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
          {/** 
          <div className="flex_item">
            <iframe
              className="mapsiframe"
              src="https://map.worldweatheronline.com/temperature"
              frameborder="0"
            ></iframe>
          </div>
          /}
        </div>
        */}
      </div>
    </>
  );
}
