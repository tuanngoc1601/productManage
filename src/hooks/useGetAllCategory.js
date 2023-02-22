import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import CategoryApi from "../api/CategoryApi";
import { CategoriesList } from "../recoil/Products";

const useGetAllCategory = (depen, searchValue) => {
  const [categories, setCateogries] = useRecoilState(CategoriesList);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data: categories } = await CategoryApi.getAllCategories();
        setCateogries(categories);
      } catch (error) {
        toast.error("GET CATEGORY ERR ", error.response.data.message);
      }
    };
    getData();
  }, [depen, setCateogries]);
  if (!searchValue) return categories;
  return categories.filter((category) =>
    category.name.toLowerCase().includes(searchValue.toLowerCase())
  );
};

export default useGetAllCategory;
