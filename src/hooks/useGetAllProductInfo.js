import ProductApi from "../api/ProductApi";
import { useEffect, useState } from "react";

const useGetAllProductInfo = () => {
  const [categories, setCateogries] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data: categories } = await ProductApi.getAllCategories();
      const { data: colors } = await ProductApi.getAllColors();
      const { data: sizes } = await ProductApi.getAllSizes();
      const { data: products } = await ProductApi.getAllProducts();
      setCateogries(categories);
      setColors(colors);
      setSizes(sizes);
      setProducts(products);
    };
    getData();
  }, []);
  return { categories, colors, sizes, products };
};

export default useGetAllProductInfo;
