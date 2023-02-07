import { axiosClient } from "./axiosClient";
class ProductApi {
  static getAllProducts = async () => {
    const url = "/products";
    return await axiosClient.get(url);
  };
  static getAllUserProducts = async () => {
    const url = "/user/products";
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
    const url = "/sizes";
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

  static updateProduct = async (data, id) => {
    const url = `/products/${id}`;
    return await axiosClient.post(url, data);
  };

  static deleteProduct = async (id) => {
    const url = `/products/${id}`;
    return await axiosClient.delete(url);
  };

  static getAllPrice = async () => {
    const url = "/price";
    return await axiosClient.get(url);
  };
}

export default ProductApi;
