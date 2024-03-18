import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
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
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  // ApexCharts options and config

  var data = [
    { x: "2001", y: 231 },
    { x: "2003", y: 122 },
    { x: "2004", y: 63 },
    { x: "2005", y: 421 },
    { x: "2006", y: 122 },
    { x: "2007", y: 323 },
    { x: "2002", y: 231 },
    { x: "2003", y: 122 },
    { x: "2004", y: 63 },
    { x: "2005", y: 421 },
    { x: "2006", y: 102 },
    { x: "2007", y: 323 },
    { x: "2002", y: 231 },
    { x: "2003", y: 122 },
    { x: "2004", y: 63 },
    { x: "2005", y: 421 },
    { x: "2006", y: 122 },
    { x: "2007", y: 323 },
    { x: "2008", y: 111 },
    { x: "2009", y: 231 },
    { x: "2010", y: 200 },
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
    const delta = document.getElementById("delta");
    if (TempChg > 0) {
      delta.style.backgroundColor = "#77db95";
      delta.style.color = "white";
      delta.style.fontWeight = "bolder";
    } else if (TempChg < 0) {
      delta.style.backgroundColor = "#df6565";
      delta.style.color = "white";
      delta.style.fontWeight = "bolder";
    } else {
      delta.style.backgroundColor = "#96a099";
      delta.style.color = "white";
      delta.style.fontWeight = "bolder";
    }
  });

  return (
    <>
      <div
        className="md:p-6 pb-0"
      >
        <div class="flex justify-between pb-4 mb-4 der-b">
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-3">
              <img
                src={props.TempIcon}
                alt="Temp Icon"
                className="rounded-lg"
              />
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
            <span
              id="delta"
              className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300"
            >
              <span>{TempChg} %</span>
            </span>
          </div>
        </div>

        <ResponsiveContainer
          width={screenWidth / 2}
          height={screenHeight / 2.5}
        >
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                color: "black",
                borderRadius: "10px",
                border: "0px",
                boxShadow: "0px 0px 5px 0px wheat",
              }}
            />
            <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
