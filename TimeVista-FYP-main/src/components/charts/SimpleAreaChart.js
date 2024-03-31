import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SimpleAreaChart(props) {
  const [startyear, setStartYear] = useState("-");
  const [endyear, setEndYear] = useState("-");
  const [tempChg, settempChg] = useState("-");
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  var delta = document.getElementById("delta");
  var tempChange;

  useEffect(() => {
    if (props.Flag && props.chartData.length > 0) {
      const data = props.chartData;
      const dataLength = data.length - 1;
      const minInputDate = data[0].x;
      const parts = minInputDate.split("-");
      const parsedDate = new Date(parts[2], parts[1] - 1, parts[0]);
      const formatter = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const MinDate = formatter.format(parsedDate);
      setStartYear(MinDate);
      const maxInputDate = data[dataLength].x;
      const maxparts = maxInputDate.split("-");
      const maxparsedDate = new Date(maxparts[2], maxparts[1] - 1, maxparts[0]);
      const maxformatter = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const MaxDate = maxformatter.format(maxparsedDate);
      setEndYear(MaxDate);
      tempChange = (
        ((parseInt(data[dataLength].y) - parseInt(data[0].y)) /
          parseInt(data[0].y)) *
        100
      ).toFixed(2);
      settempChg(tempChange);

      delta.style.borderRadius = "10px";
      delta.style.padding = "5px";
      delta.style.paddingLeft = "7px";
      delta.style.paddingRight = "7px";
      delta.style.fontSize = "14px";
      if (tempChange > 0) {
        delta.style.backgroundColor = "#77db95";
        delta.style.color = "white";
        delta.style.fontWeight = "bolder";
      } else if (tempChange < 0) {
        delta.style.backgroundColor = "#df6565";
        delta.style.color = "white";
        delta.style.fontWeight = "bolder";
      } else {
        delta.style.backgroundColor = "#96a099";
        delta.style.color = "white";
        delta.style.fontWeight = "bolder";
      }
    }
  }, [props.Flag, props.chartData]);

  return (
    <div className="md:p-6 pb-0">
      <div className="flex justify-between pb-4 mb-4 der-b">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-3">
            <img src={props.TempIcon} alt="Temp Icon" className="rounded-lg" />
          </div>
          <div>
            <h5 className="leading-none text-2xl font-bold pb-1">
              {props.feature}
            </h5>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400 mt-1">
              {props.Flag ? `${startyear} - ${endyear}` : "2020-2002"}
            </p>
          </div>
        </div>
        <div>
          <span id="delta">
            <span className="">{props.Flag ? `${tempChg} %` : "0 %"}</span>
          </span>
        </div>
      </div>

      <ResponsiveContainer width={screenWidth / 2} height={screenHeight / 2.5}>
        {props.Flag && props.chartData.length > 0 ? (
          <AreaChart
            data={props.chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis
              domain={[
                Math.round(props.MinVal) - 2,
                Math.round(props.MaxVal) + 2,
              ]} // Set the domain dynamically based on the data
            />
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
        ) : (
          <AreaChart
            data={[
              { x: "2002", y: 100 },
              { x: "2003", y: 100 },
              { x: "2004", y: 100 },
              { x: "2005", y: 100 },
              { x: "2006", y: 100 },
              { x: "2007", y: 100 },
              { x: "2008", y: 100 },
              { x: "2009", y: 100 },
            ]}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis
              domain={[props.MinVal - 5, props.MaxVal + 5]} // Set the domain dynamically based on the data
            />
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
        )}
      </ResponsiveContainer>
    </div>
  );
}
