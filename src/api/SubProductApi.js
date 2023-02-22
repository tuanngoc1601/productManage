import { axiosClient } from "./axiosClient";
class SubProductApi {
  static deleteSubProduct = async (id) => {
    const url = `/sub-products/${id}`;
    return await axiosClient.delete(url);
  };

  static createSubProduct = async (data) => {
    const url = "/sub-products";
    return await axiosClient.post(url, data);
  };
}

export default SubProductApi;
