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

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3qLbueLrzZdqV_DEqM15FGYr_KlqMuLE",
  authDomain: "p01-product.firebaseapp.com",
  projectId: "p01-product",
  storageBucket: "p01-product.appspot.com",
  messagingSenderId: "717743062706",
  appId: "1:717743062706:web:9bdb1f7e82216d646753ab",
  measurementId: "G-XZ803VF0J6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
