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
        <LineChart data={Data}>
          <XAxis
            dataKey="x"
            label={{ value: "Year", position: "insideBottom", offset: 0 }}
            tickMargin={20}
          />
          <YAxis
            label={{ value: Type, angle: -90, position: "insideLeft" }}
            domain={[0, "dataMax"]} // Adjust the domain as needed
          />
          <Tooltip />
          <Legend />
          <Line dataKey="y" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
