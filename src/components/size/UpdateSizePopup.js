import { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import Popup from "reactjs-popup";
import { messages } from "../../constants/messages";
import SizeService from "../../services/SizeService";
const UpdateSizePopup = ({ size }) => {
  const { updateSize, handleError } = SizeService();
  const [updateSizeName, setUpdateSizeName] = useState("");

  const handleUpdateSize = async () => {
    try {
      await updateSize(size, updateSizeName);
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
        setUpdateSizeName("");
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
          <div className="header mb-2 text-xl">{messages.size.updateSize}</div>
          <div className="content">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                {messages.size.currentName}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                value={size.name}
                type="text"
                placeholder={messages.size.placeholderSizeName}
                disabled
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                {messages.common.new}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                value={updateSizeName}
                type="text"
                placeholder="Enter Category Name"
                onChange={(e) => setUpdateSizeName(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={handleUpdateSize}
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

export default UpdateSizePopup;
