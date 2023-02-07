import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import ProductApi from "../api/ProductApi";
import { SizesList } from "../recoil/Products";
const useGetAllSize = () => {
  const [sizes, setSizes] = useRecoilState(SizesList);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data: sizes } = await ProductApi.getAllSizes();
        setSizes(sizes);
      } catch (error) {
        toast.error("GET PRODUCTS ERR: ", error.response.data.message);
      }
    };
    getData();
  }, []);
  return sizes;
};

export default useGetAllSize;
