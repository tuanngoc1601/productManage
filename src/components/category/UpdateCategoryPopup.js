import React, { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import Popup from "reactjs-popup";
import { messages } from "../../constants/messages";
import CategoryService from "../../services/CategoryService";
const UpdateCategoryPopup = ({ category }) => {
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const { updateCategory, handleError } = CategoryService();
  const handleUpdateCategory = async () => {
    try {
      await updateCategory(category, updateCategoryName);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <Popup
      trigger={<BsFillPencilFill className="mr-4 cursor-pointer" />}
      modal
      nested
      onOpen={() => {
        setUpdateCategoryName("");
      }}
    >
      {(close) => (
        <div className="modal relative px-2 py-4">
          <button
            className="close absolute right-0 top-0 outline-none text-[#292d3e]"
            onClick={close}
          >
            &times;
          </button>
          <div className="header mb-2 text-xl">
            {messages.category.updateCategory}
          </div>
          <div className="content">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                {messages.category.currentName}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                value={category.name}
                type="text"
                placeholder={messages.category.placeholderCategoryName}
                disabled
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                {messages.category.new}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                value={updateCategoryName}
                type="text"
                placeholder={messages.category.placeholderCategoryName}
                onChange={(e) => setUpdateCategoryName(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={handleUpdateCategory}
              >
                {messages.common.btnUpdate}
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

export default UpdateCategoryPopup;
