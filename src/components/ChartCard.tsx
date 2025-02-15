import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { ChartDatum } from "../api";

export type ChartType = "line" | "area" | "bar" | "pie";

type ChartCardProps = {
  id: string;
  data: ChartDatum[];
  title: string;
  chartType: ChartType;
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];

const ChartCard: React.FC<ChartCardProps> = ({
  id,
  data,
  title,
  chartType,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    background: "#fff",
  };

  let chartContent = null;
  switch (chartType) {
    case "line":
      chartContent = (
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      );
      break;
    case "area":
      chartContent = (
        <AreaChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      );
      break;
    case "bar":
      chartContent = (
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      );
      break;
    case "pie":
      chartContent = (
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={50}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      );
      break;
    default:
      chartContent = null;
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        {chartContent || <>No chart available</>}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;
