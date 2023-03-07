import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import SizeApi from "../api/SizeApi";
import { SizesList } from "../store/SizeState";
const useGetAllSize = (depen, searchValue) => {
  const [sizes, setSizes] = useRecoilState(SizesList);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: sizes } = await SizeApi.getAllSizes();
        setSizes(sizes);
      } catch (error) {
        toast.error("GET PRODUCTS ERR ", error.response.data.message);
      }
    };

    getData();
  }, [depen, setSizes]);

  if (!searchValue) return sizes;

  return sizes.filter((size) =>
    size.name.toLowerCase().includes(searchValue.toLowerCase())
  );
};

export default useGetAllSize;
