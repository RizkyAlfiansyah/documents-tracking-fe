import axios from "../lib/axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const data = [
    {
      id_document: "22848677",
      nama: "Abyasa Mangunsong",
      resi: "27712576MRS",
      checkpoint: "checkpoint 3",
      status: "Aktif",
      created_at: "08/01/2022",
      updated_at: "08/01/2022",
    },
    {
      id_document: "12026841",
      nama: "Hasna Usamah",
      resi: "26222840MRS",
      checkpoint: "checkpoint 4",
      status: "Aktif",
      created_at: "08/01/2022",
      updated_at: "08/01/2022",
    },
    {
      id_document: "28399289",
      nama: "Sadina Hastuti S.Pt",
      resi: "36279170MRS",
      checkpoint: "checkpoint 2",
      status: "Aktif",
      created_at: "08/01/2022",
      updated_at: "08/01/2022",
    },
    {
      id_document: "25837093",
      nama: "Dirja Irfan Natsir M.TI.",
      resi: "81602762MRS",
      checkpoint: "checkpoint 10",
      status: "Aktif",
      created_at: "08/01/2022",
      updated_at: "08/01/2022",
    },
    {
      id_document: "49036161",
      nama: "Darmana Narpati",
      resi: "26192323MRS",
      checkpoint: "checkpoint 1",
      status: "Aktif",
      created_at: "08/01/2022",
      updated_at: "08/01/2022",
    },
    {
      id_document: "63295954",
      nama: "Edison Irawan",
      resi: "85190050MRS",
      checkpoint: "checkpoint 5",
      status: "Aktif",
      created_at: "08/01/2022",
      updated_at: "08/01/2022",
    },
    {
      id_document: "89154909",
      nama: "Lalita Sudiati",
      resi: "62800848MRS",
      checkpoint: "checkpoint 2",
      status: "Aktif",
      created_at: "08/01/2022",
      updated_at: "08/01/2022",
    },
  ];

  useEffect(() => {
    axios.get("prisoners/").then((res) => {
      console.log(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/prisoners/delete`, { id: [1, 2, 3, 4, 5, 6] })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="text-red-900">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          {" "}
          Enter Your Email{" "}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          {" "}
          password{" "}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleSubmit}
        >
          {" "}
          Login{" "}
        </button>
      </div>
    </div>
  );
}
