import React from "react";
import { Line as LineChart } from "react-chartjs-2";
import {
  BubbleDataPoint,
  CategoryScale,
  Chart,
  ChartData,
  LinearScale,
  LineController,
  LineElement,
  Point,
  PointElement,
  Title,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

export interface ISalesData {
  date: string;
  amount: number | [number, number] | Point | BubbleDataPoint | null;
}

interface IDashboardChart {
  salesData: ISalesData[];
}

type TCharData = ChartData<
  "line",
  (number | [number, number] | Point | BubbleDataPoint | null)[],
  unknown
>;
const DashboardChart: React.FC<IDashboardChart> = ({ salesData }) => {
  const chartLabels = salesData.map((sale) => sale.date);
  const chartValues = salesData.map((sale) => sale.amount);

  const chartData: TCharData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Sales",
        borderColor: "#3182ce",
        data: chartValues,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <LineChart
      height={100}
      data={chartData}
      options={{
        elements: {
          line: {
            tension: 0.3,
            borderWidth: 1.5,
          },
          point: { radius: 0 },
        },
        // scales: {
        //   yAxes: [
        //     {
        //       ticks: {
        //         callback: (value: String) => formatCurrency(value),
        //       },
        //     },
        //   ],
        // },
      }}
    />
  );
};

export default DashboardChart;
