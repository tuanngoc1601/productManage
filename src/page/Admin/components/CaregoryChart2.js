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
import React from "react";
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

const CaregoryChart2 = ({ categoriySatisctics }) => {
  const labels = categoriySatisctics.map((item) => item.name);
  const counts = categoriySatisctics.map((item) => item.count);
  return (
    <div>
      <Bar
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

export default CaregoryChart2;
