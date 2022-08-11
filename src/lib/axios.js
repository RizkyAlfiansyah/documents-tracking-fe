import Axios from "axios";

// export const axios = Axios.create({
//   baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     Authorization: "Bearer " + token,
//     "Access-Control-Allow-Origin": "*",
//   },
// });

export const AxiosApi = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const getPengajuan = async (token) => {
  const res = await Axios.get(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/pengajuan`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return res.data;
};

export const getPrisoners = async (token) => {
  const res = await Axios.get(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/prisoners`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return res.data;
};

export const postPrisoners = async (token, data) => {
  const res = await Axios.post(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/prisoners`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return res.data;
};

export const editPrisoners = async (token, data) => {
  const res = await Axios.put(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/prisoners/${data.id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return res.data;
};

export const deletePrisoners = async (token, data) => {
  const res = await Axios.post(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/prisoners/delete`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return res.data;
};
