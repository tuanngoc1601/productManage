import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import StatisticService from "../../../../services/StatisticService";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const NewProductChart = ({ newProducts }) => {
  const { data, options } =
    StatisticService.getChartDataNewProducts(newProducts);
  return <Bar options={options} data={data} width={360} height={240} />;
};

export default NewProductChart;
