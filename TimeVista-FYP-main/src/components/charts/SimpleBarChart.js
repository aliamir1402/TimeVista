import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

export default function SimpleLineChart(props) {
  const { Data, Type } = props;

  return (
    <div className="temp rounded-lg shadow p-4 md:p-6 divvBox">
      <h2 className="text-center mb-4 text-2xl flex justify-center items-center">
        Historical Trend of {Type}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart width={700} height={400} data={Data}>
          <XAxis
            dataKey="x"
            label={{ value: "Year", position: "insideBottom", offset: 0 }}
            tickMargin={3}
          />
          <ReferenceLine x={"04-2024"} stroke="red" label="Boundary" />
          <YAxis
            label={{ value: Type, angle: -90, position: "insideLeft" }}
            domain={[Math.min(...Data.map((item) => item.y)), "dataMax"]}
          />
          <Tooltip />
          <Line dataKey="y" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
