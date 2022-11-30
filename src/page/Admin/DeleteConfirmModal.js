import ProductApi from "../../api/ProductApi";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { ProductsList } from "../../recoil/Products";
import { useNavigate } from "react-router-dom";
const DeleteConfirmModal = ({ setIsOpenDeleteModal, deleteItem }) => {
  const nagivate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const setProducts = useSetRecoilState(ProductsList);
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-90 flex  justify-center">
      <div className="w-96 max-h-48 bg-white flex flex-col rounded-md mt-20">
        <h1 className="w-full h-10 py-1 bg-blue-700 text-center text-xl font-bold text-white ">
          Xóa sản phẩm
        </h1>
        {!isDeleting ? (
          <div className="px-2">
            <span className="w-full text-black">
              Dữ liệu về sản phẩm có thể mất hoàn toàn trong tương lai. Bạn có
              chắc chắn muốn xóa sản phẩm này ?
            </span>
            <div className="mt-6 w-full flex justify-end px-2 py-2">
              <button
                className=" px-3 py-2 bg-red-500 text-black rounded-md mr-2 hover:bg-red-700 hover:after:text-white"
                onClick={async () => {
                  try {
                    setIsDeleting(true);
                    await ProductApi.deleteProduct(deleteItem);
                    setProducts((prev) => {
                      const newProducts = prev.filter(
                        (product) => product.product_id !== deleteItem
                      );
                      return newProducts;
                    });
                    setIsOpenDeleteModal(false);
                    nagivate(0);
                  } catch (error) {
                    setIsOpenDeleteModal(false);
                    console.log(error);
                  }
                }}
              >
                Xác nhận
              </button>
              <button
                className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-slate-700"
                onClick={() => {
                  setIsOpenDeleteModal(false);
                }}
              >
                Hủy
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
