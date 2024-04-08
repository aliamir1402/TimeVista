import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ApexCharts from "apexcharts";

var globalOptions;
export default function SimpleLineChart(props) {
  const [startyear, setstartyear] = useState("-");
  const [endyear, setendyear] = useState("-");
  const [TempChg, setTempChg] = useState("-");
  // ApexCharts options and config

  var data = [
    { x: "10", y: 231 },
    { x: "20", y: 122 },
    { x: "30", y: 63 },
    { x: "40", y: 421 },
    { x: "50", y: 122 },
    { x: "60", y: 323 },
    { x: "70", y: 111 },
    { x: "80", y: 231 },
    { x: "100", y: 122 },
  ];
  var dataLength = data.length - 1;

  useEffect(() => {
    // Calculate the start year
    setstartyear(parseInt(data[0].x));

    // Calculate the end year
    setendyear(parseInt(data[dataLength].x));
    setTempChg(
      (
        ((parseInt(data[dataLength].y) - parseInt(data[0].y)) /
          parseInt(data[0].y)) *
        100
      ).toFixed(2)
    );
  });

  return (
    <>
      <div class="temp rounded-lg shadow p-4 md:p-6 divvBox ">
        <div class="flex justify-between pb-4 mb-4 der-b">
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-3">
              <img src={props.TempIcon} alt="Temp Icon" className="rounded-lg" />
            </div>
            <div>
              <h5 class="leading-none text-2xl font-bold pb-1">
                {props.feature}
              </h5>
              <p class="text-sm font-normal text-gray-500 dark:text-gray-400 mt-1">
                {startyear} - {endyear}
              </p>
            </div>
          </div>
          <div>
            <span class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
              <span>{TempChg} %</span>
            </span>
          </div>
        </div>

        {/*Content*/}
        <ResponsiveContainer width={550} height={350}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="Humidity" unit=" grams/m3" />
            <YAxis type="number" dataKey="y" name="Rainfall" unit=" mm" />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                color: "black",
                borderRadius: "10px",
                border: "0px",
                boxShadow: "0px 0px 5px 0px wheat",
              }}
            />
            <Scatter name="A school" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
