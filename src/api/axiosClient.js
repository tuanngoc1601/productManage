import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "conten-type": "application/json",
  },
});

const axiosSubClient = axios.create({
  baseURL: process.env.REACT_APP_SUB_API_URL,
  headers: {
    "conten-type": "application/json",
  },
});

export { axiosClient, axiosSubClient };
