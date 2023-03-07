import { useState } from "react";
import { IoOptions } from "react-icons/io5";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useRecoilValue } from "recoil";
import useGetAllProductInfo from "../../hooks/useGetAllProductInfo";
import { CategoriesList } from "../../store/CategoryState";
import { ColorsList } from "../../store/ColorState";
import { SizesList } from "../../store/SizeState";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import ProductTable from "./components/ProductTable";

const ManageProduct = () => {
  const [deleteProduct, setDeleteProduct] = useState(true);
  const { products, loading } = useGetAllProductInfo(deleteProduct);
  const sizes = useRecoilValue(SizesList);
  const colors = useRecoilValue(ColorsList);
  const categories = useRecoilValue(CategoriesList);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  return (
    <div className="mt-12 px-20 w-full mb-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-red-500 text-3xl font-bold">Manage products</h1>
        <Popup
          trigger={
            <button className="px-4 py-4 rounded-md bg-gray-200  font-semibold hover:bg-gray-400">
              <IoOptions />
            </button>
          }
          position="bottom right"
          on="hover"
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          arrow={false}
        >
          <div className="w-full flex flex-col ">
            <Link
              className="cursor-pointer hover:text-blue-500 py-1 my-1 h-[28px] border-b-[1px] outline-none"
              to="/product/create-product"
            >
              Add product
            </Link>
            <Link
              className="cursor-pointer hover:text-blue-500 py-1 my-1 h-[28px] border-b-[1px] "
              to="/product/category"
            >
              Add category
            </Link>
            <Link
              className="cursor-pointer hover:text-blue-500 py-1 my-1 h-[28px] border-b-[1px] "
              to="/product/color"
            >
              Add color
            </Link>
            <Link
              className="cursor-pointer hover:text-blue-500 py-1 my-1 h-[28px] "
              to="/product/size"
            >
              Add size
            </Link>
          </div>
        </Popup>
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
          setDeleteProduct={setDeleteProduct}
        />
      )}
    </div>
  );
};

export default ManageProduct;
