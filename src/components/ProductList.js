import React from "react";
import { useState, useEffect } from "react";
import Styles from "../css/productList.module.css";
import Loading from "../components/Loading";
import Product from "./Product";
import { useGlobalContext } from "../context";

const ProductList = () => {
  const { loading, setLoading, searchText } = useGlobalContext();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
      const data = await response.json();
      if (data) {
        const newData = data.map((product) => {
          const {
            product_id,
            product_name,
            product_description,
            color,
            size,
            category_id,
            img_urls,
          } = product;
          return {
            id: product_id,
            name: product_name,
            images: img_urls,
            info: product_description,
            color: color,
            category_id: category_id,
            size: size,
          };
        });
        setProducts(newData);
        setLoading(false);
      } else {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let newProducts = products;
    if (searchText !== "") {
      let text = searchText;
      let newListProducts = products.filter((product) => {
        return product.name.toUpperCase().indexOf(text.toLowerCase()) !== -1;
      });
      // setProducts(newListProducts);
    } else {
      setProducts(newProducts);
    }
  }, [searchText]);

  if (loading) {
    return <Loading />;
  }
  if (products.length < 1) {
    return (
      <h2 className={Styles.section_title}>
        no products matched your search criteria
      </h2>
    );
  }

  return (
    <section className={Styles.section}>
      <h2 className={Styles.section_title}>Products List</h2>
      <div className={Styles.products_center}>
        {products.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
    </section>
  );
};

export default ProductList;
