import axiosClient from "./axiosClient";
class ProductApi {
  static getAllProducts = () => {
    const url = "/products";
    return axiosClient.get(url);
  };
  static getProductById = (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  };
  static getAllColors = () => {
    const url = "/colors";
    return axiosClient.get(url);
  };
  static getAllSizes = () => {
    const url = "/size";
    return axiosClient.get(url);
  };
  static getAllCategories = () => {
    const url = "/categories";
    return axiosClient.get(url);
  };
  static createProduct = (data) => {
    const url = "/products";
    return axiosClient.post(url, data);
  };
}

export default ProductApi;
