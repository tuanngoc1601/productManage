import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductApi from "../api/ProductApi";
const useGetUserProductById = (id) => {
  const [userProduct, setUserProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data: product } = await ProductApi.getAllUserProductById(id);
        setUserProduct(product);
        setLoading(true);
      } catch (error) {
        toast.error("GET PRODUCTS ERR: ", error.response.data.message);
        setLoading(true);
      }
    };
    getData();
  }, []);
  return { userProduct, loading };
};

export default useGetUserProductById;
