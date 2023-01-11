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
  const labels = Object.keys(newProducts);
  const dataCategoryArr = Object.values(newProducts);
  const options = {
    // responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Số lượng sản phẩm được thêm vào trong 3 tháng gần nhất",
      },
      colors: {
        enabled: true,
        forceOverride: true,
      },
    },
  };
  const dataCategory = dataCategoryArr.reduce((acc, cur) => {
    return acc.concat(cur);
  }, []);
  const data = {
    labels,
    datasets: dataCategory.map((item) => {
      return {
        label: item.name,
        data: [0, item.count, 0],
      };
    }),
  };
  return <Bar options={options} data={data} width={360} height={240} />;
};

export default NewProductChart;
