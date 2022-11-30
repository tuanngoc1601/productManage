import ProductApi from "../api/ProductApi";
import { useEffect } from "react";
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
      try {
        const { data: categories } = await ProductApi.getAllCategories();
        const { data: colors } = await ProductApi.getAllColors();
        const { data: sizes } = await ProductApi.getAllSizes();
        const { data: products } = await ProductApi.getAllProducts();
        const { data: prices } = await ProductApi.getAllPrice();
        const newProducts = products.map((product) => {
          const price = prices.find(
            (price) => price.Product_id == product.product_id
          );
          return { ...product, price: price?.price };
        });
        setCateogries(categories);
        setColors(colors);
        setSizes(sizes);
        setProducts(newProducts);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return { categories, colors, sizes, products };
};

export default useGetAllProductInfo;
