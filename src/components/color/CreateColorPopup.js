import React, { useState } from "react";
import Popup from "reactjs-popup";
import { messages } from "../../constants/messages";
import ColorService from "../../services/ColorService";
const CreateColorPopup = () => {
  const { createColor, handleError } = ColorService();
  const [newColor, setNewColor] = useState({});

  const handleCreateColor = async () => {
    try {
      await createColor(newColor);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Popup
      trigger={
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 w-60">
          {messages.color.btnAddColor}
        </button>
      }
      modal
      nested
      onOpen={() => {
        setNewColor({ name: "", code: "" });
      }}
    >
      {(close) => (
        <div className="modal relative px-2 py-4">
          <button className="close absolute right-0 top-0" onClick={close}>
            &times;
          </button>
          <div className="header mb-2"> {messages.color.btnAddColor} </div>
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
                value={newColor.name}
                type="text"
                placeholder={messages.color.placeholderColorName}
                required
                onChange={(e) => {
                  setNewColor({ ...newColor, name: e.target.value });
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
                value={newColor.code}
                placeholder={messages.color.placeholderColorCode}
                onChange={(e) => {
                  setNewColor({ ...newColor, code: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="actions">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCreateColor}
            >
              {messages.common.btnAdd}
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default CreateColorPopup;
