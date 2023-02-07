import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
        toast.error("Failed to fetch category statistics: ", Error);
      }
    };
    fetchCategoryStatistics();
  }, []);
  return { categoriySatisctics, newProducts };
};

export default useGetStatistics;
