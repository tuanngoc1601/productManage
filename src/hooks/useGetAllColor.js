import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import ColorApi from "../api/ColorApi";
import { ColorsList } from "../store/ColorState";
const useGetAllColor = (depen, searchValue) => {
  const [colors, setColors] = useRecoilState(ColorsList);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: colors } = await ColorApi.getAllColors();
        setColors(colors);
      } catch (error) {
        toast.error("GET COLOR ERR ", error.response.data.message);
      }
    };
    getData();
  }, [depen, setColors]);

  if (!searchValue) return colors;

  return colors.filter(
    (color) =>
      color.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      color.code.toLowerCase().includes(searchValue.toLowerCase())
  );
};

export default useGetAllColor;
