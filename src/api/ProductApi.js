import axiosClient from "./axiosClient";
class ProductApi {
  static getAllProducts = async () => {
    const url = "/products";
    return await axiosClient.get(url);
  };
  static getProductById = async (id) => {
    const url = `/products/${id}`;
    return await axiosClient.get(url);
  };
  static getAllColors = async () => {
    const url = "/colors";
    return await axiosClient.get(url);
  };
  static getAllSizes = async () => {
    const url = "/size";
    return await axiosClient.get(url);
  };
  static getAllCategories = async () => {
    const url = "/categories";
    return await axiosClient.get(url);
  };
  static createProduct = async (data) => {
    const url = "/products";
    return await axiosClient.post(url, data);
  };

  static updateProduct = async (data) => {
    const url = `/products/${data.product_id}`;
    return await axiosClient.put(url, data);
  };

  static deleteProduct = async (id) => {
    const url = `/products/${id}`;
    return await axiosClient.delete(url);
  };
}

export default ProductApi;
