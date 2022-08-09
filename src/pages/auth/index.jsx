import Image from "next/image";
import React, { useState } from "react";
import Logo from "assets/kumham-logo.png";
import { Button, Input, Label } from "components";
import { AxiosApi } from "lib/axios";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState('');

  const onClickLogin = async () => {
    if (data) {
      AxiosApi.post("/login", data).then((res) => {
        if (res.data) {
          localStorage.setItem("token", res.data.data.token);
          //save token to cookie
          document.cookie = `token=${res.data.data.token}`;

          router.push("/dashboard");
        }
      }).catch((err) => {
        setError("Username/Nip atau Password salah !");
      })
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-96 min-h-screen flex flex-col items-center justify-center pt-6">
        <div className="flex flex-col gap-4 items-center">
          <Image src={Logo} alt="Kumham Logo" className="w-20 h-20 m-auto" width={120} height={120} />
          <p className="text-center font-semibold"> Selamat Datang !</p>
        </div>
        <div className="w-full mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
          <div className="flex flex-col gap-4">
            {
              error &&
              <p className="text-red-600 bg-red-300 p-2 rounded-sm text-xs font-semibold">
                {error}
              </p>
            }
            <div>
              <Label forInput="email" value="Email" />
              <Input
                type="text"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                autoComplete="username"
                isFocused={true}
                handleChange={(e) => setData({ ...data, identifier: e.target.value })}
              />
            </div>
            <div>
              <Label forInput="password" value="Password" />
              <Input
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                autoComplete="username"
                isFocused={true}
                handleChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-end mt-4">
              <button type="button" className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ml-4" disabled={data ? false : true} onClick={onClickLogin}>
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
