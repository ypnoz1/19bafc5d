import axios from "axios";
export let baseApiUrl = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: baseApiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("tokens");
    if (token) {
      config.headers.Authorizations = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

const get = async (url, config = {}) => {
  const response = await axiosInstance.get(url, config);
  return response.data;
};

const post = async (url, data, config = {}) => {
  const response = await axiosInstance.post(url, data, config);
  return response.data;
};

const patch = async (url, data, config = {}) => {
  const response = await axiosInstance.patch(url, data, config);
  return response.data;
};

export default {
  get,
  post,
  patch,
};
