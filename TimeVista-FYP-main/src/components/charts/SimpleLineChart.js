import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceDot,
  ResponsiveContainer,
} from "recharts";

export default function SimpleLineChart(props) {
  const { Type, Year, HighlightedValue } = props;
  const Data = props.Data[props.index];
  return (
    <div className="shadow p-4 md:p-6 divvBox" style={{ width: "60vw" }}>
      <h2 className="text-center mb-4 text-2xl flex justify-center items-center">
        Historical Trend of Crop {Type}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart width={700} height={380} data={props.Data[props.index]}>
          <XAxis
            dataKey="x"
            name="Year"
            label={{ value: "Year", position: "center", offset: 0 }}
            tickMargin={20}
          />
          <ReferenceLine
            x={2023}
            stroke="red"
            label="Future Estimates"
            labelBackgroundColor="lightgrey"
            position="top"
          />

          <YAxis label={{ value: Type, angle: -90, position: "insideLeft" }} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              color: "black",
              borderRadius: "10px",
              border: "0px",
              boxShadow: "0px 0px 5px 0px wheat",
            }}
          />

          <Line
            type="monotone"
            dataKey={props.Type}
            stroke="#8884d8"
            strokeWidth={2}
          />
          {/* Add ReferenceDot for the highlighted year */}
          <ReferenceDot
            x={Year}
            y={Data.find((data) => data.x === Year)[Type]} // Set Y value based on the data for the specified year and type
            r={8}
            fill="red"
            stroke="white"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
