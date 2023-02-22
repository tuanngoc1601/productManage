import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FireWork from "./components/FireWork";
import Navbar from "./components/Navbar";
import useGetAllCategory from "./hooks/useGetAllCategory";
import useGetAllColor from "./hooks/useGetAllColor";
import useGetAllSize from "./hooks/useGetAllSize";
import ManageProduct from "./page/Admin";
import Category from "./page/Admin/Category";
import Chart from "./page/Admin/Chart";
import Color from "./page/Admin/Color";
import Product from "./page/Admin/Product";
import Size from "./page/Admin/Size";
import UpdateProduct from "./page/Admin/UpdateProduct";
import Error from "./page/Error";
function App() {
  const colors = useGetAllColor();
  const sizes = useGetAllSize();
  const categories = useGetAllCategory();
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Chart />} />
        <Route path="/firework" element={<FireWork />} />
        <Route path="/product" element={<ManageProduct />} />
        <Route
          path="/product/create-product"
          element={
            <Product sizes={sizes} colors={colors} categories={categories} />
          }
        />
        <Route
          path="/product/update-product/:productId"
          element={<UpdateProduct categories={categories} />}
        />
        <Route path="/product/category" element={<Category />} />
        <Route path="/product/color" element={<Color />} />
        <Route path="/product/size" element={<Size />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
