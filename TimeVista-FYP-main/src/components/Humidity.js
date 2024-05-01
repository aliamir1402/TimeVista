import React, { useState } from "react";
import SimpleAreaChart from "./charts/SimpleAreaChart.js";
import TempIcon from "../components/images/icons8-humidity-80.png";
import calender from "../components/images/calender.svg";
import Subloader from "../components/subloader.js";

export default function Humidity() {
  const [CityList, setCityList] = useState([""]);
  const [CityVal, setCityVal] = useState("");
  const [ChartData, setChartData] = useState([]);
  const [Flag, setFlag] = useState(0);
  const [metricsObj, setMetricsObj] = useState({});
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

  const cityHandleFunc = (event) => {
    setCityVal(event.target.value);
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
    TimeLapsesButtonFunc();
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
    TimeLapsesButtonFunc();
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
    TimeLapsesButtonFunc();
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
    TimeLapsesButtonFunc();
  };
  const handleTimeSelection5 = () => {
    setSelection5(!selection5);
    setSelection2(0);
    setSelection3(0);
    setSelection4(0);
    setSelection1(0);
    setSelection6(0);
    setSelection7(0);
    setSelection8(0);
    TimeLapsesButtonFunc();
  };
  const handleTimeSelection6 = () => {
    setSelection6(!selection6);
    setSelection2(0);
    setSelection3(0);
    setSelection4(0);
    setSelection5(0);
    setSelection1(0);
    setSelection7(0);
    setSelection8(0);
    TimeLapsesButtonFunc();
  };
  const handleTimeSelection7 = () => {
    setSelection7(!selection7);
    setSelection2(0);
    setSelection3(0);
    setSelection4(0);
    setSelection5(0);
    setSelection6(0);
    setSelection1(0);
    setSelection8(0);
    TimeLapsesButtonFunc();
  };
  const handleTimeSelection8 = () => {
    setSelection8(!selection8);
    setSelection2(0);
    setSelection3(0);
    setSelection4(0);
    setSelection5(0);
    setSelection6(0);
    setSelection7(0);
    setSelection1(0);
    TimeLapsesButtonFunc();
  };

  const TimeLapsesButtonFunc = () => {
    setFlag(0);
    let ReqOBJ = {};
    let cityID;
    let feature = 3;

    cityID = CityVal;

    if (selection1) {
      ReqOBJ = {
        city: cityID,
        feature: feature,
        timestamp: 1,
        days: 1,
      };
    } else if (selection2) {
      ReqOBJ = {
        city: cityID,
        feature: feature,
        timestamp: 2,
        days: 7,
      };
    } else if (selection3) {
      ReqOBJ = {
        city: cityID,
        feature: feature,
        timestamp: 3,
        days: 30,
      };
    } else if (selection4) {
      ReqOBJ = {
        city: cityID,
        feature: feature,
        timestamp: 4,
        days: 365,
      };
    } else if (selection5) {
      ReqOBJ = {
        city: cityID,
        feature: feature,
        timestamp: 5,
        days: 5 * 365,
      };
    } else if (selection6) {
      ReqOBJ = {
        city: cityID,
        feature: feature,
        timestamp: 6,
        days: 10 * 365,
      };
    } else if (selection7) {
      ReqOBJ = {
        city: cityID,
        feature: feature,
        timestamp: 7,
        days: 25 * 365,
      };
    } else if (selection8) {
      ReqOBJ = {
        city: cityID,
        feature: feature,
        timestamp: 8,
        days: 1000000,
      };
    }

    FetchDataCityWiseFunc(ReqOBJ);
  };

  const FetchDataCityWiseFunc = async (Reqobj) => {
    try {
      const response = await fetch("http://localhost:4000/api/HistoryData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Reqobj),
      });
      var responseData = await response.json();
      console.log(responseData);
      MetricsFunc(responseData);
      // Check if Flag is already set to 1
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setFlag(1);
    }
  };

  const MetricsFunc = (graphData) => {
    let tempArray = [],
      DateArray = [];
    let dataChart = [];
    for (let i = 0; i < graphData.length; i++) {
      tempArray.push(graphData[i].Humidity);
      DateArray.push(graphData[i].date);
      dataChart.push({
        x: graphData[i].date,
        y: graphData[i].Humidity,
      });
    }
    dataChart.reverse();
    console.log(dataChart);
    const minValue = Math.min(...tempArray);
    const minIndex = tempArray.indexOf(minValue);
    const maxValue = Math.max(...tempArray);
    const maxIndex = tempArray.indexOf(maxValue);
    const sum = tempArray.reduce((acc, curr) => acc + curr, 0);
    const avgValue = sum / tempArray.length;
    const minInputDate = DateArray[minIndex];
    const parts = minInputDate.split("-");
    const parsedDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const formatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const MinDate = formatter.format(parsedDate);

    const maxInputDate = DateArray[maxIndex];
    const maxparts = maxInputDate.split("-");
    const maxparsedDate = new Date(maxparts[2], maxparts[1] - 1, maxparts[0]);
    const maxformatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const MaxDate = maxformatter.format(maxparsedDate);

    setChartData(dataChart);
    console.log(ChartData);
    setMetricsObj({
      minValue: minValue,
      minDate: MinDate,
      maxValue: maxValue,
      maxDate: MaxDate,
      avgValue: avgValue,
    });
    console.log(ChartData);
  };
  const renderContent = () => {
    if (Flag) {
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
                    onChange={cityHandleFunc}
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
                feature="Humidity"
                TempIcon={TempIcon}
                Flag={Flag}
                chartData={ChartData}
                MinVal={metricsObj.minValue}
                MaxVal={metricsObj.maxValue}
              ></SimpleAreaChart>
              <div className="flex_box flex justify-end p-4 pt-0">
                <div>
                  <button
                    onClick={handleTimeSelection1}
                    className={` ${
                      selection1 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    1D
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleTimeSelection2}
                    className={` ${
                      selection2 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    7D
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleTimeSelection3}
                    className={` ${
                      selection3 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    1M
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleTimeSelection4}
                    className={` ${
                      selection4 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    1Y
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleTimeSelection5}
                    className={` ${
                      selection5 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    5Y
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleTimeSelection6}
                    className={` ${
                      selection6 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    10Y
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleTimeSelection7}
                    className={` ${
                      selection7 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    25Y
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleTimeSelection8}
                    className={` ${
                      selection8 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    MAX
                  </button>
                </div>
              </div>
              <div className="flex_box flex justify-end pr-4 pb-1 text-xs text-gray-400">
                *Double Click on the Time Intervals
              </div>
            </div>
            {
              <div
                className="p-6 ml-8 w-fit h-fit div-box-feature"
                style={{ boxShadow: "0px 0px 10px 0px rgb(230, 230, 230)" }}
              >
                <div className="p-2 bgcolor-feature-2 mb-4">
                  <div className="name-box-feature-2 mb-4">Mean Humidity</div>
                  <div className="name-box-feature-description-2">
                    {(metricsObj.avgValue - 273.15 + 273.15).toFixed(1)} %
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
                    Minimum Humidity
                  </div>
                  <div className="name-box-feature-description-2">
                    {(metricsObj.minValue - 273.15 + 273.15).toFixed(1)} %
                  </div>
                  <div className="name-box-feature-date-2 flex">
                    <div className="">
                      <img
                        src={calender}
                        alt="calender"
                        height={20}
                        width={20}
                      />
                    </div>
                    <div
                      className="name-box-feature-date-sub-2"
                      style={{ color: "#434343" }}
                    >
                      {metricsObj.minDate}
                    </div>
                  </div>
                </div>
                <div className="p-2 bgcolor-feature-1 mb-4">
                  <div className="name-box-feature-1">Maximum Humidity</div>
                  <div className="name-box-feature-description-1">
                    {(metricsObj.maxValue - 273.15 + 273.15).toFixed(1)} %
                  </div>
                  <div className="name-box-feature-date-1 flex">
                    <div className="">
                      <img
                        src={calender}
                        alt="calender"
                        height={20}
                        width={20}
                      />
                    </div>
                    <div className="name-box-feature-date-sub-1">
                      {metricsObj.maxDate}
                    </div>
                  </div>
                </div>
              </div>
            }
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
              src="https://map.worldweatheronline.com/Humidity"
              frameborder="0"
            ></iframe>
          </div>
          /}
        </div>
        */}
          </div>
        </>
      );
    } else {
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
                    onChange={cityHandleFunc}
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
                feature="Humidity"
                TempIcon={TempIcon}
                Flag={Flag}
                chartData={ChartData}
              ></SimpleAreaChart>
              <div className="flex_box flex justify-end p-4 pt-0">
                <div>
                  <button
                    onClick={handleTimeSelection1}
                    className={` ${
                      selection1 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    1D
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleTimeSelection2}
                    className={` ${
                      selection2 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    7D
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleTimeSelection3}
                    className={` ${
                      selection3 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    1M
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleTimeSelection4}
                    className={` ${
                      selection4 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    1Y
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleTimeSelection5}
                    className={` ${
                      selection5 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    5Y
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleTimeSelection6}
                    className={` ${
                      selection6 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    10Y
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleTimeSelection7}
                    className={` ${
                      selection7 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    25Y
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleTimeSelection8}
                    className={` ${
                      selection8 ? "selected" : "time-stamps-button"
                    }`}
                  >
                    MAX
                  </button>
                </div>
              </div>
            </div>
            {
              <div
                className="p-6 ml-8 w-fit h-fit div-box-feature"
                style={{ boxShadow: "0px 0px 10px 0px rgb(230, 230, 230)" }}
              >
                <div className="p-2 bgcolor-feature-2 mb-4">
                  <div className="name-box-feature-2 mb-4">Mean Humidity</div>
                  <div className="flex justify-center items-center">
                    <Subloader></Subloader>
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
                    Minimum Humidity
                  </div>
                  <div className="flex justify-center items-center">
                    <Subloader></Subloader>
                  </div>
                  <div className="name-box-feature-date-2 flex">
                    <div className="flex justify-center items-center">
                      <img
                        src={calender}
                        alt="calender"
                        height={20}
                        width={20}
                      />
                    </div>
                    <div
                      className="name-box-feature-date-sub-2"
                      style={{ color: "#434343" }}
                    >
                      <Subloader></Subloader>
                    </div>
                  </div>
                </div>
                <div className="p-2 bgcolor-feature-1 mb-4">
                  <div className="name-box-feature-1">Maximum Humidity</div>
                  <div className="flex justify-center items-center">
                    <Subloader></Subloader>
                  </div>
                  <div className="name-box-feature-date-1 flex">
                    <div className="flex justify-center items-center">
                      <img
                        src={calender}
                        alt="calender"
                        height={20}
                        width={20}
                      />
                    </div>
                    <div className="name-box-feature-date-sub-1">
                      <Subloader></Subloader>
                    </div>
                  </div>
                </div>
              </div>
            }
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
              src="https://map.worldweatheronline.com/Humidity"
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
  };
  return (
    <div>
      {/* Common JSX elements */}
      {renderContent()}
    </div>
  );
}
