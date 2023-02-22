import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useRecoilState } from "recoil";
import CategoryApi from "../../api/CategoryApi";
import Loading from "../../components/Loading/Loading";
import useGetAllCategory from "../../hooks/useGetAllCategory";
import { SearchNavbarValue } from "../../recoil/SearchValues";
import { toastListError } from "../../utils";
const Category = () => {
  const [isReload, setIsReaload] = useState(false);
  const [searchValue] = useRecoilState(SearchNavbarValue);
  const categories = useGetAllCategory(isReload, searchValue);
  const [categoryName, setCategoryName] = useState("");
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCreateCategory = async () => {
    try {
      if (!categoryName) return toast.warning("Category name is required!");
      setLoading(true);
      await CategoryApi.createCategory({
        name: categoryName,
      });
      setLoading(false);
      setIsReaload(!isReload);
      toast.success("Add new category successfully");
    } catch (error) {
      setLoading(false);
      toastListError(error);
    }
  };
  const handleUpdateCategory = async (category) => {
    try {
      if (!updateCategoryName) {
        return toast.warning("Category name is required !");
      }

      if (updateCategoryName === category.name) {
        return toast.warning("Category name is exsited !");
      }
      setLoading(true);
      await CategoryApi.updateCategory({
        id: category.id,
        name: updateCategoryName,
      });
      setIsReaload(!isReload);
      setLoading(false);
      toast.success("Update category successfully");
    } catch (error) {
      setLoading(false);
      toastListError(error);
    }
  };
  const handleDeleteCategory = async (id) => {
    try {
      setLoading(true);
      await CategoryApi.deleteCategory(id);
      setIsReaload(!isReload);
      setLoading(false);
      toast.success("Delete category successfully");
    } catch (error) {
      setLoading(false);
      toastListError(error);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="my-6 mx-20 relative overflow-x-auto flex flex-col items-center">
      <Popup
        trigger={
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Add New Category
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
                  value={categoryName}
                  type="text"
                  placeholder="Enter Category Name"
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
                Add
              </button>
            </div>
          </div>
        )}
      </Popup>
      <table className="w-2/3 text-sm  text-gray-500 dark:text-gray-400 text-center">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              No.
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={category.id}
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{category.name}</td>
              <td className="px-6 py-4 flex items-center justify-center">
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
                      <div className="header mb-2 text-xl">Update Category</div>
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
                            value={category.name}
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
                            value={updateCategoryName}
                            type="text"
                            placeholder="Enter Category Name"
                            onChange={(e) =>
                              setUpdateCategoryName(e.target.value)
                            }
                          />
                        </div>
                        <div className="flex justify-center">
                          <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                            onClick={() => handleUpdateCategory(category)}
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
                      <div className="header mb-2 text-xl">Delete Category</div>
                      <div className="content">
                        <p>
                          Data of the product may be lost completely in the
                          future. Are you sure you want to delete this category?
                        </p>
                        <div className="flex justify-center">
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                            onClick={() => handleDeleteCategory(category.id)}
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

export default Category;
