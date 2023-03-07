import { AiFillDelete } from "react-icons/ai";
import Popup from "reactjs-popup";
import { messages } from "../../constants/messages";
import SizeService from "../../services/SizeService";
const DeleteSizePopup = ({ sizeId }) => {
  const { deleteSize, handleError } = SizeService();

  const handleDeleteSize = async () => {
    try {
      await deleteSize(sizeId);
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
          <div className="header mb-2 text-xl">{messages.size.deleteSize}</div>
          <div className="content">
            <p>{messages.size.confirmDeleteMessage}</p>
            <div className="flex justify-center">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={handleDeleteSize}
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

export default DeleteSizePopup;
