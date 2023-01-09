import { useEffect } from "react";
import { useRecoilState } from "recoil";
import ProductApi from "../api/ProductApi";
import {
  CategoriesList,
  ColorsList,
  ProductsList,
  SizesList,
  UserProductsList,
} from "../recoil/Products";
const useGetAllProductInfo = () => {
  const [categories, setCateogries] = useRecoilState(CategoriesList);
  const [colors, setColors] = useRecoilState(ColorsList);
  const [sizes, setSizes] = useRecoilState(SizesList);
  const [products, setProducts] = useRecoilState(ProductsList);
  const [userProducts, setUserProducts] = useRecoilState(UserProductsList);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data: categories } = await ProductApi.getAllCategories();
        const { data: colors } = await ProductApi.getAllColors();
        const { data: sizes } = await ProductApi.getAllSizes();
        const { data: products } = await ProductApi.getAllProducts();
        const { data: userProducts } = await ProductApi.getAllUserProducts();
        setCateogries(categories);
        setColors(colors);
        setSizes(sizes);
        setProducts(products);
        setUserProducts(userProducts);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return { categories, colors, sizes, products, userProducts };
};

export default useGetAllProductInfo;
