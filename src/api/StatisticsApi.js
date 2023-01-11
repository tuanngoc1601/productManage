import { axiosClient } from "./axiosClient";
class StatisticsApi {
  static getAllProducts = async () => {
    const url = "/statistics/category";
    return await axiosClient.get(url);
  };
  static getNewProducts = async () => {
    const url = "/statistics/new-products";
    return await axiosClient.get(url);
  };
}

export default StatisticsApi;
