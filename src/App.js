import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import useGetAllProductInfo from "./hooks/useGetAllProductInfo";
import Admin from "./page/Admin";
import Chart from "./page/Admin/Chart";
import CreateProductForm from "./page/Admin/components/CreateProductForm";
import UpdateProductForm from "./page/Admin/components/UpdateProductForm";
import Error from "./page/Error";
function App() {
  const { colors, sizes, categories, userProducts } = useGetAllProductInfo();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Chart />} />
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
