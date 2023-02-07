import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import ProductApi from "../api/ProductApi";
import { ColorsList } from "../recoil/Products";
const useGetAllColor = () => {
  const [colors, setColors] = useRecoilState(ColorsList);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data: colors } = await ProductApi.getAllColors();
        setColors(colors);
      } catch (error) {
        toast.error("GET COLOR ERR: ", error.response.data.message);
      }
    };
    getData();
  }, []);
  return colors;
};

export default useGetAllColor;
