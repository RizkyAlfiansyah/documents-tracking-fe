import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "Bearer 1|a8VVg17abxqK0Q8W31eZifMe6Qs6M9WXIpp51Enl",
    "Access-Control-Allow-Origin": "*",
  },
});

export default axios;
