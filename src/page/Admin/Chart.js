import useGetStatistics from "../../hooks/useGetStatistics";
import CaregoryChart from "./components/CaregoryChart";
import CaregoryChart2 from "./components/CaregoryChart2";
import NewProductChart from "./components/NewProductChart";
const Chart = () => {
  const { newProducts, categoriySatisctics } = useGetStatistics();
  return (
    <div className="flex mx-20 py-8 justify-center">
      <div>
        <div>
          <CaregoryChart categoriySatisctics={categoriySatisctics} />
        </div>
        <div>
          <CaregoryChart2 categoriySatisctics={categoriySatisctics} />
        </div>
      </div>
      <div className="w-full h-[480px] ml-40">
        <NewProductChart newProducts={newProducts} />
      </div>
    </div>
  );
};

export default Chart;
