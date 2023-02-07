import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FireWork from "./components/FireWork";
import Navbar from "./components/Navbar";
import useGetAllCategory from "./hooks/useGetAllCategory";
import useGetAllColor from "./hooks/useGetAllColor";
import useGetAllProductInfo from "./hooks/useGetAllProductInfo";
import useGetAllSize from "./hooks/useGetAllSize";
import Admin from "./page/Admin";
import Chart from "./page/Admin/Chart";
import NewProduct from "./page/Admin/NewProduct";
import UpdateProduct from "./page/Admin/UpdateProduct";
import Error from "./page/Error";
function App() {
  const colors = useGetAllColor();
  const sizes = useGetAllSize();
  const categories = useGetAllCategory();
  const { userProducts } = useGetAllProductInfo();
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Chart />} />
        <Route path="/firework" element={<FireWork />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/admin/create-product"
          element={
            <NewProduct sizes={sizes} colors={colors} categories={categories} />
          }
        />
        <Route
          path="/admin/update-product/:productId"
          element={
            <UpdateProduct
              userProducts={userProducts}
              categories={categories}
            />
          }
        />
        <Route path="/error" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
