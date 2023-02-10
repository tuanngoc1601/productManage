import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useGetAllProductInfo from "../../hooks/useGetAllProductInfo";
import { CategoriesList, ColorsList, SizesList } from "../../recoil/Products";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import ProductTable from "./components/ProductTable";
const Admin = () => {
  const { products, loading } = useGetAllProductInfo();
  const sizes = useRecoilValue(SizesList);
  const colors = useRecoilValue(ColorsList);
  const categories = useRecoilValue(CategoriesList);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  return (
    <div className="mt-12 px-20 w-full mb-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-red-500 text-3xl font-bold">Manage products</h1>
        <button className="px-3 py-2 rounded-md bg-blue-500  font-semibold hover:bg-blue-600">
          <Link to="/admin/create-product" className="text-white  no-underline">
            Create product
          </Link>
        </button>
      </div>
      <ProductTable
        products={products}
        colors={colors}
        sizes={sizes}
        categories={categories}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        setDeleteItem={setDeleteItem}
        loading={loading}
      />
      {isOpenDeleteModal && (
        <DeleteConfirmModal
          setIsOpenDeleteModal={setIsOpenDeleteModal}
          deleteItem={deleteItem}
          products={products}
        />
      )}
    </div>
  );
};

export default Admin;
