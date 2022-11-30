import ProductApi from "../api/ProductApi";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  ProductsList,
  ColorsList,
  SizesList,
  CategoriesList,
} from "../recoil/Products";
const useGetAllProductInfo = () => {
  const [categories, setCateogries] = useRecoilState(CategoriesList);
  const [colors, setColors] = useRecoilState(ColorsList);
  const [sizes, setSizes] = useRecoilState(SizesList);
  const [products, setProducts] = useRecoilState(ProductsList);
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
