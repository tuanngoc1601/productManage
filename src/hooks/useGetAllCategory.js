import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import ProductApi from "../api/ProductApi";
import { CategoriesList } from "../recoil/Products";

const useGetAllCategory = () => {
  const [categories, setCateogries] = useRecoilState(CategoriesList);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data: categories } = await ProductApi.getAllCategories();
        setCateogries(categories);
      } catch (error) {
        toast.error("GET CATEGORY ERR: ", error.response.data.message);
      }
    };
    getData();
  }, []);
  return categories;
};

export default useGetAllCategory;
