import { useEffect, useState } from "react";
import StatisticsApi from "../api/StatisticsApi";
const useGetStatistics = () => {
  const [categoriySatisctics, setCategoryStatistics] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  useEffect(() => {
    const fetchCategoryStatistics = async () => {
      try {
        const response1 = await StatisticsApi.getAllProducts();
        setCategoryStatistics(response1.data);
        const response2 = await StatisticsApi.getNewProducts();
        setNewProducts(response2.data);
      } catch (error) {
        console.log("Failed to fetch category statistics: ", error);
      }
    };
    fetchCategoryStatistics();
  }, []);
  return { categoriySatisctics, newProducts };
};

export default useGetStatistics;
