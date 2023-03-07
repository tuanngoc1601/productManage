import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductApi from "../api/ProductApi";
const useGetAllProductInfo = (depen) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data: products } = await ProductApi.getAllProducts();
        setProducts(products.filter((product) => product.status));
        setLoading(true);
      } catch (error) {
        toast.error("GET PRODUCTS ERR ", error.response.data.message);
        setLoading(true);
      }
    };

    getData();
  }, [depen]);

  return { products, loading };
};

export default useGetAllProductInfo;
