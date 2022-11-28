import React from "react";
import { Link } from "react-router-dom";
import useGetAllProductInfo from "../../hooks/useGetAllProductInfo";
import ProductTable from "./ProductTable";
const Admin = () => {
  const { products, sizes, colors, categories } = useGetAllProductInfo();
  return (
    <div className="mt-12 px-44 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-red-500 text-xl font-bold">Manage products</h1>
        <button className="px-3 py-2 rounded-md bg-blue-500  font-semibold hover:bg-blue-600">
          <Link to="/admin/create-product" className="text-white">
            Create product
          </Link>
        </button>
      </div>
      <ProductTable
        products={products}
        colors={colors}
        sizes={sizes}
        categories={categories}
      />
    </div>
  );
};

export default Admin;
