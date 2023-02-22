import { useState } from "react";
import { toast } from "react-toastify";
import ProductApi from "../../../api/ProductApi";
const DeleteConfirmModal = ({
  setIsOpenDeleteModal,
  deleteItem,
  setDeleteProduct,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await ProductApi.deleteProduct(deleteItem);
      toast.success("Delete product successfully!");
      setIsOpenDeleteModal(false);
      setDeleteProduct((prev) => !prev);
    } catch (error) {
      toast.error("Delete product failed!");
      setIsOpenDeleteModal(false);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-100 flex  justify-center">
      <div className="w-96 max-h-48 bg-white flex flex-col rounded-md mt-20">
        <h1 className="w-full h-10 py-1 bg-blue-700 text-center text-xl font-bold text-white ">
          Delete product
        </h1>
        {!isDeleting ? (
          <div className="px-2">
            <span className="w-full text-black">
              Data of the product may be lost completely in the future. Are you
              sure you want to delete this product?
            </span>
            <div className="mt-6 w-full flex justify-end px-2 py-2">
              <button
                className=" px-3 py-2 bg-red-500 text-black rounded-md mr-2 hover:bg-red-700 hover:after:text-white"
                onClick={handleDelete}
              >
                Confirm
              </button>
              <button
                className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-slate-700"
                onClick={() => setIsOpenDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">Deleting...</div>
        )}
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
