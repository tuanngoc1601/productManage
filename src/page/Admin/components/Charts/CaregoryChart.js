import {
  ArcElement,
  Chart as ChartJS,
  Colors,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Colors, Title);

const CaregoryChart = ({ categoriySatisctics }) => {
  const labels = categoriySatisctics.map((item) => item.name);
  const counts = categoriySatisctics.map((item) => item.count);

  return (
    <div>
      <Pie
        data={{
          labels: labels,
          datasets: [
            {
              label: "Số lượng sản phẩm",
              data: counts,
              borderWidth: 1,
            },
          ],
        }}
        width={360}
        height={240}
        options={{
          plugins: {
            colors: {
              enabled: true,
              forceOverride: true,
            },
            title: {
              display: true,
              text: "Thống kê sản phẩm theo danh mục",
            },
          },
        }}
      />
    </div>
  );
};

export default CaregoryChart;
