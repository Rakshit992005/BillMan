import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import axios from "axios";

const Graph = ({ range }) => {
  const [graphData, setGraphData] = useState([]);
  const [graphX, setGraphX] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/dashboard/graph?${range}`,
          { withCredentials: true },
        );

        // Extract into an array all at once to avoid multiple state re-renders
        const newGraphData = [];
        const newGraphX = [];

        response.data.data.forEach((element) => {
          newGraphData.push(element.totalAmount);
          // For readability, if range is week we can prepend "Day" or similar, but let's stick to raw generic labels or logic
          newGraphX.push(element.label);
        });

        setGraphData(newGraphData);
        setGraphX(newGraphX);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [range]);

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "350px" }}>
      <LineChart
        xAxis={[
          {
            data: graphX.length ? graphX : [1, 2, 3], // fallback to prevent crash on empty
            scaleType: "point", // prevents floating point numbers on axis
            tickLabelStyle: { fill: "#64748b", fontSize: 13, fontWeight: 600 },
          },
        ]}
        yAxis={[
          {
            valueFormatter: (value) =>
              `₹${Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(value)}`,
          },
        ]}
        series={[
          {
            data: graphData.length ? graphData : [0, 0, 0], // fallback
            area: true, // premium gradient fill
            showMark: true,
            curve: "catmullRom", // smooth curves instead of sharp angles
            color: "#4f46e5", // indigo-600
          },
        ]}
        // Margin provides spacing so labels don't clip
        margin={{ top: 20, right: 30, left: 60, bottom: 40 }}
        sx={{
          [`.${lineElementClasses.root}`]: {
            strokeWidth: 4,
          },
          [`.${markElementClasses.root}`]: {
            stroke: "#4f46e5",
            fill: "#ffffff",
            strokeWidth: 3,
          },
          "& .MuiAreaElement-root": {
            fill: "url(#colorGradient)", // Custom gradient defined below
          },
          "& .MuiChartsAxis-tickLabel": {
            fontFamily: "inherit",
          },
          "& .MuiChartsAxis-line": {
            stroke: "#e2e8f0",
            strokeWidth: 2,
          },
          "& .MuiChartsAxis-tick": {
            stroke: "#e2e8f0",
          },
        }}
      >
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
          </linearGradient>
        </defs>
      </LineChart>
    </div>
  );
};

export default Graph;
