import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import useGetAllProductInfo from "./hooks/useGetAllProductInfo";
import Admin from "./page/Admin";
import CreateProductForm from "./page/Admin/CreateProductForm";
import UpdateProductForm from "./page/Admin/UpdateProductForm";
import Error from "./page/Error";

function App() {
  const { colors, sizes, categories, userProducts } = useGetAllProductInfo();
  return (
    <>
      <Navbar />
      <Routes>
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
          element={
            <UpdateProductForm
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
