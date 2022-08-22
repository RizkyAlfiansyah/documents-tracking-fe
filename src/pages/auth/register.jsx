import Image from "next/image";
import React, { useState } from "react";
import Logo from "assets/kumham-logo.png";
import { Button, Input, Label } from "components";
import { AxiosApi } from "lib/axios";
import { useRouter } from "next/router";

const Home = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        username: "",
        nip: "",
        name: "",
        password: "",
        confirm_password: "",
    });

    const [error, setError] = useState('');

    const onClickLogin = async () => {
        setLoading(true);
        // console.log(data);
        if (data) {
            AxiosApi.post("/register", data).then((res) => {
                if (res.data) {
                    localStorage.setItem("token", res.data.data.token);
                    router.push("/dashboard");
                }
            }).catch((err) => {
                setError("Semua Field Harus Diisi !");
                setLoading(false);
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
                            <Label forInput="nama" value="Nama" />
                            <Input
                                type="text"
                                name="nama"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                isFocused={true}
                                handleChange={(e) => {
                                    setData({ ...data, name: e.target.value })
                                    setLoading(false)
                                }}
                            />
                        </div>
                        <div>
                            <Label forInput="username" value="Username" />
                            <Input
                                type="text"
                                name="username"
                                value={data.username}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                isFocused={true}
                                handleChange={(e) => {
                                    setData({ ...data, username: e.target.value })
                                    setLoading(false)
                                }}
                            />
                        </div>
                        <div>
                            <Label forInput="nip" value="NIP" />
                            <Input
                                type="text"
                                name="nip"
                                value={data.nip}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                isFocused={true}
                                handleChange={(e) => {
                                    setData({ ...data, nip: e.target.value })
                                    setLoading(false)
                                }}
                            />
                        </div>
                        <div>
                            <Label forInput="password" value="Password" />
                            <Input
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                handleChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label forInput="confirm_password" value="Konfirmasi Password" />
                            <Input
                                type="password"
                                name="confirm_password"
                                value={data.confirm_password}
                                className="mt-1 block w-full"
                                autoComplete="off"
                                handleChange={(e) => setData({ ...data, confirm_password: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <button type="button" className="inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150 ml-4 disabled:bg-gray-400"
                                disabled={loading || !data.name ? true : false} onClick={onClickLogin}>
                                Buat Akun
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;