import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const StockChart = ({ prices }) => {
  if (prices.length === 0) {
    console.log("No chart data available");
  }
  const data = {
    labels: prices.map((_, i) => i + 1),
    datasets: [
      {
        label: "Stock Price",
        data: prices,
        borderColor: "blue",
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} />;
};

export default StockChart;
