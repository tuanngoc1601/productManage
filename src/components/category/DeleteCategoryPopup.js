import { AiFillDelete } from "react-icons/ai";
import Popup from "reactjs-popup";
import CategoryService from "../../services/CategoryService";
import { messages } from "../../constants/messages";
const DeleteCategoryPopup = ({ categoryId }) => {
  const { deleteCategory, handleError } = CategoryService();

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(categoryId);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <Popup trigger={<AiFillDelete className="cursor-pointer" />} modal nested>
      {(close) => (
        <div className="modal relative px-2 py-4">
          <button
            className="close absolute right-0 top-0 outline-none text-[#292d3e]"
            onClick={close}
          >
            &times;
          </button>
          <div className="header mb-2 text-xl">
            {messages.category.deleteCategory}
          </div>
          <div className="content">
            <p>{messages.category.confirmDeleteMessage}</p>
            <div className="flex justify-center">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={handleDeleteCategory}
              >
                {messages.common.btnConfirm}
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={close}
              >
                {messages.common.btnCancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default DeleteCategoryPopup;
