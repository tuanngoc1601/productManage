import { useState } from "react";
import Popup from "reactjs-popup";
import { messages } from "../../constants/messages";
import CategoryService from "../../services/CategoryService";
const CreateCategoryPopup = () => {
  const [categoryName, setCategoryName] = useState("");
  const { createCategory, handleError } = CategoryService();

  const handleCreateCategory = async () => {
    try {
      await createCategory(categoryName);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Popup
      trigger={
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          {messages.category.btnAddCategory}
        </button>
      }
      modal
      nested
      onOpen={() => {
        setCategoryName("");
      }}
    >
      {(close) => (
        <div className="modal relative px-2 py-4">
          <button className="close absolute right-0 top-0" onClick={close}>
            &times;
          </button>
          <div className="header mb-2">{messages.category.btnAddCategory}</div>
          <div className="content">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                {messages.common.name}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                value={categoryName}
                type="text"
                placeholder={messages.category.placeholderCategoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="actions">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCreateCategory}
            >
              {messages.common.btnAdd}
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default CreateCategoryPopup;
