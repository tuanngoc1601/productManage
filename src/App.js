import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import useGetAllProductInfo from "./hooks/useGetAllProductInfo";
import About from "./page/About";
import Admin from "./page/Admin";
import CreateProductForm from "./page/Admin/CreateProductForm";
import UpdateProductForm from "./page/Admin/UpdateProductForm";
import Error from "./page/Error";
import SingleProduct from "./page/SingleProduct";
import User from "./page/User";

function App() {
  const { colors, sizes, categories } = useGetAllProductInfo();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/admin/create-product"
          element={
            <CreateProductForm
              sizes={sizes}
              colors={colors}
              categories={categories}
            />
          }
        />
        <Route
          path="/admin/update-product/:productId"
          element={<UpdateProductForm />}
        />
        <Route
          path="/user/products/:id"
          element={<SingleProduct colors={colors} sizes={sizes} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
