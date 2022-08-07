import Image from "next/image";
import React, { useState } from "react";
import Logo from "assets/kumham-logo.png";
import { Button, Input, Label } from "components";
import { useForm } from "react-hook-form";

const Home = () => {
  const { register, handleSubmit, errors } = useForm();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [processing, setProcessing] = useState(false);

  const onHandleChange = (e) => {
    setProcessing(true);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-96 min-h-screen flex flex-col items-center justify-center pt-6">
        <div className="flex flex-col gap-4 items-center">
          <Image src={Logo} alt="Kumham Logo" className="w-20 h-20 m-auto" width={120} height={120} />
          <p className="text-center font-semibold"> Selamat Datang !</p>
        </div>
        <div className="w-full mt-6 px-6 py-4 bg-white shadow-md overflow-hidden rounded-lg">
          <form className="flex flex-col gap-4">
            <div>
              <Label forInput="email" value="Email" />
              <Input
                type="text"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                autoComplete="username"
                isFocused={true}
                handleChange={onHandleChange}
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
                handleChange={onHandleChange}
              />
            </div>
            <div className="flex items-center justify-end mt-4">
              <Button className="ml-4" processing={processing}>
                Log in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
