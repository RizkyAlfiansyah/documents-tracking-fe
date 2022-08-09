import Axios from "axios";

const getUserToken =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

console.log("getUserToken", getUserToken);
export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer " + getUserToken,
    "Access-Control-Allow-Origin": "*",
  },
});

export const AxiosApi = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
