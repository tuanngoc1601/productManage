import { axiosClient } from "./axiosClient";
class ColorApi {
  static getAllColors = async () => {
    const url = "/colors";
    return await axiosClient.get(url);
  };

  static createColor = async (data) => {
    const url = "/colors";
    return await axiosClient.post(url, data);
  };

  static updateColor = async (data) => {
    const url = `/colors/${data.id}`;
    return await axiosClient.post(url, data);
  };

  static deleteColor = async (id) => {
    const url = `/colors/${id}`;
    return await axiosClient.delete(url);
  };
}

export default ColorApi;
