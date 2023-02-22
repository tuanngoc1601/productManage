import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import { useRecoilState } from "recoil";
import ColorApi from "../../api/ColorApi";
import Loading from "../../components/Loading/Loading";
import useGetAllColor from "../../hooks/useGetAllColor";
import { SearchNavbarValue } from "../../recoil/SearchValues";
import { toastListError } from "../../utils";

const Color = () => {
  const [isReload, setIsReaload] = useState(false);
  const [searchValue] = useRecoilState(SearchNavbarValue);
  const colors = useGetAllColor(isReload, searchValue);
  const [newColor, setNewColor] = useState({});
  const [updateColor, setUpdateColor] = useState({});
  const [loading, setLoading] = useState(false);
  const handleCreateColor = async () => {
    try {
      if (!newColor.name) return toast.warning("Color name is required!");
      if (!newColor.code) return toast.warning("Color code is required!");
      setLoading(true);
      await ColorApi.createColor(newColor);
      setLoading(false);
      setIsReaload(!isReload);
      toast.success("Add new color successfully");
    } catch (error) {
      setLoading(false);
      toastListError(error);
    }
  };
  const handleUpdateColor = async (id) => {
    try {
      if (!updateColor.name) {
        setUpdateColor({});
        return toast.warning("Color name is required !");
      }
      if (!updateColor.code) {
        setUpdateColor({});
        return toast.warning("Color code is required !");
      }
      setLoading(true);
      await ColorApi.updateColor({
        id: id,
        name: updateColor.name,
        code: updateColor.code,
      });
      setIsReaload(!isReload);
      setLoading(false);
      toast.success("Update color successfully");
      setUpdateColor({});
    } catch (error) {
      setLoading(false);
      toastListError(error);
      setUpdateColor({});
    }
  };
  const handleDeleteCategory = async (id) => {
    try {
      setLoading(true);
      await ColorApi.deleteColor(id);
      setLoading(false);
      setIsReaload(!isReload);
      toast.success("Delete color successfully");
    } catch (error) {
      setLoading(false);
      toastListError(error);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="my-12 mx-20 relative overflow-x-auto">
      <Popup
        trigger={
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 w-60">
            Add New Color
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
            <div className="header mb-2"> Add New Category </div>
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
                  value={newColor.name}
                  type="text"
                  placeholder="Enter Category Name"
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
                  Color Code
                </label>
                <input
                  className="shadow appearance-none border rounded w-1/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
                  id="code"
                  type="color"
                  value={newColor.code}
                  placeholder="Choose Color Code"
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
                Add
              </button>
            </div>
          </div>
        )}
      </Popup>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No.
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Code
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Color
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color, index) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={color.id}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{color.name}</td>
                <td className="px-6 py-4">{color.code}</td>
                <td
                  className="px-6 py-4"
                  style={{ backgroundColor: color.code }}
                ></td>
                <td className="px-6 py-4 flex items-center justify-center">
                  <Popup
                    trigger={
                      <BsFillPencilFill className="mr-4 cursor-pointer" />
                    }
                    modal
                    nested
                    onOpen={() => {
                      setUpdateColor(color);
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
                        <div className="header mb-2 text-xl">Update Color</div>
                        <div className="content">
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2"
                              htmlFor="name"
                            >
                              Color Name
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="name"
                              value={updateColor.name}
                              type="text"
                              placeholder="Enter Color Name"
                              onChange={(e) => {
                                setUpdateColor({
                                  ...updateColor,
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
                              Color Code
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-1/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
                              id="code"
                              type="color"
                              value={updateColor.code}
                              placeholder="Choose Color Code"
                              onChange={(e) => {
                                setUpdateColor({
                                  ...updateColor,
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
                      <div class="modal relative px-2 py-4">
                        <button
                          class="close absolute right-0 top-0 outline-none text-[#292d3e]"
                          onClick={close}
                        >
                          &times;
                        </button>
                        <div class="header mb-2 text-xl"> Delete color </div>
                        <div class="content">
                          <p>
                            Data of the product may be lost completely in the
                            future. Are you sure you want to delete this color?
                          </p>
                          <div className="flex justify-center">
                            <button
                              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                              onClick={() => handleDeleteCategory(color.id)}
                            >
                              Confirm
                            </button>
                            <button
                              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Color;
