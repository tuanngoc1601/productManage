import React from "react";
import { Routes, Route } from "react-router-dom";
import User from "./page/User";
import Admin from "./page/Admin";
import Error from "./page/Error";
import About from "./page/About";
import SingleProduct from "./page/SingleProduct";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreateProductForm from "./page/Admin/CreateProductForm";
import UpdateProductForm from "./page/Admin/UpdateProductForm";
import useGetAllProductInfo from "./hooks/useGetAllProductInfo";
function App() {
    const { colors, sizes, categories } = useGetAllProductInfo();
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<User />} />
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
                {/* <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/admin/create-product" element={<CreateProductForm />} /> */}
                <Route
                    path="/products/:id"
                    element={<SingleProduct colors={colors} sizes={sizes} />}
                />

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
            <Footer />
        </>
    );
}

export default App;
