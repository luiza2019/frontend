import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:8000/api",
});

$axios.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  console.log(token);
  config.headers = {
    Authorization: `JWT ${token.accessToken}`,
  };
  console.log(config);

  return config;
});

export default $axios;
