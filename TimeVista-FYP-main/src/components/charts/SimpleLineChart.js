import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SimpleLineChart(props) {
  const { Data, Type } = props;

  return (
    <div className="temp rounded-lg shadow p-4 md:p-6 divvBox">
      <h2 className="text-center mb-4 text-2xl flex justify-center items-center">
        Historical Trend of Crop {Type}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart width={700} height={350} data={props.Data[props.index]}>
          <XAxis
            dataKey="x"
            name="Year"
            label={{ value: "Year", position: "center", offset: 0 }}
            tickMargin={20}
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
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
