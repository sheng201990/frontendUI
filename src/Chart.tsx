import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StockLineChart = (data: any) => {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: any[];
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const { company_id, close_usd } = payload[0].payload;

      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p style={{ marginBottom: "0px" }}>{`Date: ${label}`}</p>
          <p style={{ marginBottom: "0px" }}>{`Company ID: ${company_id}`}</p>
          <p style={{ marginBottom: "0px" }}>{`Close USD: $${close_usd}`}</p>
        </div>
      );
    }
    return null;
  };
  if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
    return <p style={{ display: "flex", justifyContent: "center" }}>Loading</p>;
  }
  console.log("checking chart data:", data);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "40px",
          marginBottom: "50px",
        }}
      >
        Stocks Analysis
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ResponsiveContainer width="50%" height={400}>
          <LineChart data={data.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="asof" />
            <YAxis />
            <Tooltip content={CustomTooltip} />
            <Legend />
            <Line
              dataKey="close_usd"
              stroke="#8884d8"
              name="Close USD"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockLineChart;
