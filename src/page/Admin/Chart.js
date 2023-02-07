import { useState } from "react";
import useGetStatistics from "../../hooks/useGetStatistics";
import CaregoryChart from "./components/Charts/CaregoryChart";
import CaregoryChart2 from "./components/Charts/CaregoryChart2";
import NewProductChart from "./components/Charts/NewProductChart";
const Chart = () => {
  const { newProducts, categoriySatisctics } = useGetStatistics();
  const [changeChart, setChangeChart] = useState(false);
  return (
    <div className="flex mx-20 py-8 justify-around">
      <div className="w-2/5 mr-24">
        <div className="flex flex-col">
          {changeChart ? (
            <CaregoryChart2 categoriySatisctics={categoriySatisctics} />
          ) : (
            <CaregoryChart categoriySatisctics={categoriySatisctics} />
          )}
          <button className="mt-4" onClick={() => setChangeChart(!changeChart)}>
            Change style ->
          </button>
        </div>
      </div>
      <div className="flex-1">
        <NewProductChart newProducts={newProducts} />
      </div>
    </div>
  );
};

export default Chart;
