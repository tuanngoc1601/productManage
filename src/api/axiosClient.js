import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "conten-type": "application/json",
  },
});

export default axiosClient;
