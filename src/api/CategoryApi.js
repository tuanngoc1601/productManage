import { axiosClient } from "./axiosClient";
class CategoryApi {
  static createCategory = async (data) => {
    const url = "/categories";
    return await axiosClient.post(url, data);
  };

  static updateCategory = async (data) => {
    const url = `/categories/${data.id}`;
    return await axiosClient.post(url, data);
  };

  static deleteCategory = async (id) => {
    const url = `/categories/${id}`;
    return await axiosClient.delete(url);
  };

  static getAllCategories = async () => {
    const url = "/categories";
    return await axiosClient.get(url);
  };
}

export default CategoryApi;
