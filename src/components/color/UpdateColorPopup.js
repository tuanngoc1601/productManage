import { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import Popup from "reactjs-popup";
import { messages } from "../../constants/messages";
import ColorService from "../../services/ColorService";
const UpdateColorPopup = ({ color }) => {
  const { updateColor, handleError } = ColorService();
  const [colorUpdate, setColorUpdate] = useState({});

  const handleUpdateColor = async (id) => {
    try {
      await updateColor(colorUpdate, id);
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
        setColorUpdate(color);
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
            {messages.color.btnUpdateColor}
          </div>
          <div className="content">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                {messages.color.colorName}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                value={colorUpdate.name}
                type="text"
                placeholder={messages.color.placeholderColorName}
                onChange={(e) => {
                  setColorUpdate({
                    ...colorUpdate,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="code"
              >
                {messages.color.colorCode}
              </label>
              <input
                className="shadow appearance-none border rounded w-1/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
                id="code"
                type="color"
                value={colorUpdate.code}
                placeholder={messages.color.placeholderColorCode}
                onChange={(e) => {
                  setColorUpdate({
                    ...colorUpdate,
                    code: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={() => handleUpdateColor(color.id)}
              >
                {messages.common.btnUpdate}
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  close();
                }}
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

export default UpdateColorPopup;
