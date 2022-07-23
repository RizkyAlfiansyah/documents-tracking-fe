import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + process.env.NEXT_PUBLIC_APP_API_TOKEN,
  },
});

export default axios;
