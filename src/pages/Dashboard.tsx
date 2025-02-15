import React, { useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { useMutation, useQuery } from "@tanstack/react-query";
import { ChartData, fetchChartData, persistChartOrder } from "../api";

import ChartCard, { ChartType } from "../components/ChartCard";

const defaultOrder = ["chart1", "chart2", "chart3", "chart4"];
const chartTitles: { [key: string]: string } = {
  chart1: "Sales Over Months",
  chart2: "Weekly Visitors",
  chart3: "Category Distribution",
  chart4: "Quarterly Revenue",
};

const chartTypes: { [key: string]: ChartType } = {
  chart1: "line",
  chart2: "area",
  chart3: "bar",
  chart4: "pie",
};

const Dashboard: React.FC = () => {
  const [order, setOrder] = useState<string[]>(defaultOrder);
  const {
    data: chartData,
    isLoading,
    error,
  } = useQuery<ChartData>({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });

  console.log(chartData);

  const mutation = useMutation({
    mutationFn: persistChartOrder,
    onSuccess: (data) => {
      console.log("Persist response:", data);
      alert("Order saved successfully!");
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = order.indexOf(active.id as string);
      const newIndex = order.indexOf(over.id as string);
      const newOrder = arrayMove(order, oldIndex, newIndex);
      setOrder(newOrder);
      mutation.mutate(newOrder);
    }
  };

  const handleReset = () => setOrder(defaultOrder);

  if (isLoading) return <div>Loading chart data...</div>;
  if (error) return <div>Error loading chart data.</div>;

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <button onClick={handleReset} style={{ marginBottom: "20px" }}>
        Reset Order
      </button>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          {order.map((chartId) => (
            <ChartCard
              key={chartId}
              id={chartId}
              data={chartData ? chartData[chartId] || [] : []}
              title={chartTitles[chartId]}
              chartType={chartTypes[chartId]}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Dashboard;
