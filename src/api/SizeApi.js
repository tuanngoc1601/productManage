import { axiosClient } from "./axiosClient";
class SizeApi {
  static getAllSizes = async () => {
    const url = "/sizes";
    return await axiosClient.get(url);
  };

  static createSize = async (data) => {
    const url = "/sizes";
    return await axiosClient.post(url, data);
  };

  static updateSize = async (data) => {
    const url = `/sizes/${data.id}`;
    return await axiosClient.post(url, data);
  };

  static deleteSize = async (id) => {
    const url = `/sizes/${id}`;
    return await axiosClient.delete(url);
  };
}

export default SizeApi;
