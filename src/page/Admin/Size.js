import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useRecoilState } from "recoil";
import SizeApi from "../../api/SizeApi";
import Loading from "../../components/Loading/Loading";
import useGetAllSize from "../../hooks/useGetAllSize";
import { SearchNavbarValue } from "../../recoil/SearchValues";
import { toastListError } from "../../utils";
const Size = () => {
  const [isReload, setIsReload] = useState(false);
  const [searchValue] = useRecoilState(SearchNavbarValue);
  const sizes = useGetAllSize(isReload, searchValue);
  const [sizeName, setSizeName] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateSizeName, setUpdateSizeName] = useState("");
  const handleCreateSize = async () => {
    try {
      if (!sizeName) return toast.warning("Size name is required!");
      setLoading(true);
      await SizeApi.createSize({
        name: sizeName,
      });
      setLoading(false);
      setIsReload(!isReload);
      toast.success("Add new category successfully");
    } catch (error) {
      setLoading(false);
      toastListError(error);
    }
  };
  const handleUpdateSize = async (size) => {
    try {
      if (!updateSizeName) {
        return toast.warning("Size name is required !");
      }

      if (updateSizeName === size.name) {
        return toast.warning("Size name is exsited !");
      }
      setLoading(true);
      await SizeApi.updateSize({
        id: size.id,
        name: updateSizeName,
      });
      setIsReload(!isReload);
      setLoading(false);
      toast.success("Update size successfully");
    } catch (error) {
      setLoading(false);
      toastListError(error);
    }
  };
  const handleDeleteSize = async (id) => {
    try {
      setLoading(true);
      await SizeApi.deleteSize(id);
      setIsReload(!isReload);
      setLoading(false);
      toast.success("Delete size successfully");
    } catch (error) {
      setLoading(false);
      toastListError(error);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="my-12 mx-20 relative overflow-x-auto flex flex-col items-center">
      <Popup
        trigger={
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Add New Size
          </button>
        }
        modal
        nested
        onOpen={() => {
          setSizeName("");
        }}
      >
        {(close) => (
          <div className="modal relative px-2 py-4">
            <button className="close absolute right-0 top-0" onClick={close}>
              &times;
            </button>
            <div className="header mb-2"> Add New Size </div>
            <div className="content">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  value={sizeName}
                  type="text"
                  placeholder="Enter size Name"
                  required
                  onChange={(e) => {
                    setSizeName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="actions">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCreateSize}
              >
                Add
              </button>
            </div>
          </div>
        )}
      </Popup>
      <table className="w-2/3 text-sm text-gray-500 dark:text-gray-400 text-center">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No.
            </th>
            <th scope="col" className="px-6 py-3">
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((size, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={size.id}
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{size.name}</td>
              <td className="px-6 py-4 flex items-center justify-center">
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
                      <div className="header mb-2 text-xl">Update Size</div>
                      <div className="content">
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                          >
                            Current Name
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            value={size.name}
                            type="text"
                            placeholder="Enter Category Name"
                            disabled
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="name"
                          >
                            New
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
                            onClick={() => handleUpdateSize(size)}
                          >
                            Update
                          </button>
                          <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                              close();
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Popup>
                <Popup
                  trigger={<AiFillDelete className="cursor-pointer" />}
                  modal
                  nested
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
                        {" "}
                        Delete Category{" "}
                      </div>
                      <div className="content">
                        <p>
                          Data of the product may be lost completely in the
                          future. Are you sure you want to delete this category?
                        </p>
                        <div className="flex justify-center">
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                            onClick={() => handleDeleteSize(size.id)}
                          >
                            Confirm
                          </button>
                          <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            onClick={close}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Popup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Size;
