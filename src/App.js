import React from "react";
import { Routes, Route } from "react-router-dom";
// import pages
import User from "./page/User";
import Admin from "./page/Admin";
import Error from "./page/Error";
import About from "./page/About";
import SingleProduct from "./page/SingleProduct";
// import component
import Navbar from "./components/Navbar";
import CreateProductForm from "./page/Admin/CreateProductForm";
import UpdateProductForm from "./page/Admin/UpdateProductForm";
import useGetAllProductInfo from "./hooks/useGetAllProductInfo";
function App() {
  const { products, sizes, colors, categories } = useGetAllProductInfo();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create-product" element={<CreateProductForm />} />
        <Route path="/products/:id" element={<SingleProduct colors={colors} sizes={sizes} />} />

        <Route
          path="/admin/update-product/:productId"
          element={<UpdateProductForm />}
        />
        <Route path="/about" element={<About />} />
        {/* <Route exact path="/cocktail/:id">
                    <SingleCocktail />
                </Route> */}
        <Route path="/error" element={<Error />} />
      </Routes>
    </>
  );
  // return (
  //   <>
  //     <Navbar />
  //     <Routes>
  //       <Route path="/" element={<User />} />
  //       <Route path="/admin" element={<Admin />} />
  //       <Route path="/about" element={<About />} />
  //       <Route path="/error" element={<Error />} />
  //     </Routes>
  //   </>
  // );
}

export default App;
