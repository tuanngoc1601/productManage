import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductApi from "../api/ProductApi";
const useGetAllProductInfo = () => {
  const [products, setProducts] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data: products } = await ProductApi.getAllProducts();
        const { data: userProducts } = await ProductApi.getAllUserProducts();
        setProducts(products.filter((product) => product.status));
        setUserProducts(userProducts);
        setLoading(true);
      } catch (error) {
        toast.error("GET PRODUCTS ERR: ", error.response.data.message);
        setLoading(true);
      }
    };
    getData();
  }, []);
  return { products, userProducts, loading };
};

export default useGetAllProductInfo;
