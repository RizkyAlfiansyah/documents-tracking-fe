import React, { useEffect, useState } from "react";
import LogoPNG from "assets/kumham-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faChartColumn, faArrowRightFromBracket, faStairs, faPerson, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/router";
import { getUserToken, removeToken } from "lib/authService";
import { ModalLogoutConfirmation } from "components";

export default function Sidebar() {
    const router = useRouter()
    const token = getUserToken()
    const path = router.route

    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        if (!token) {
            router.push('/auth')
        }
    }, [token])


    return (
        <>
            <div className="w-full h-full bg-white shadow-sm flex flex-col justify-between px-6 py-3">
                <div className="w-full flex flex-col gap-10">
                    <div className="flex w-full justify-center items-center">
                        <Image src={LogoPNG} alt="logo" width="64" height="64"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2 items-center">
                        <div className={`w-full flex gap-4 items-center justify-start cursor-pointer rounded-full hover:bg-slate-100  p-2 ${path == "/dashboard" && ("bg-slate-100")}`}
                            onClick={() => router.push("/dashboard")}
                        >
                            <div className="w-2 h-2">
                                <FontAwesomeIcon icon={faChartColumn} />
                            </div>
                            <span className="text-gray-600 sm:text-sm"> Dashboard </span>
                        </div>
                        <div className={`w-full flex gap-4 items-center justify-start cursor-pointer rounded-full hover:bg-slate-100  p-2 ${path == "/dashboard/warga-binaan" && ("bg-slate-100")}`}
                            onClick={() => router.push("/dashboard/warga-binaan")}
                        >
                            <div className="w-2 h-2">
                                <FontAwesomeIcon icon={faPerson} />
                            </div>
                            <span className="text-gray-600 sm:text-sm"> Warga Binaan </span>
                        </div>
                        <div className={`w-full flex gap-4 items-center justify-start cursor-pointer rounded-full hover:bg-slate-100  p-2 ${path == "/dashboard/pengajuan" && ("bg-slate-100")}`}
                            onClick={() => router.push("/dashboard/pengajuan")}
                        >
                            <div className="w-2 h-2">
                                <FontAwesomeIcon icon={faMailBulk} />
                            </div>
                            <span className="text-gray-600 sm:text-sm"> Pengajuan </span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center">
                    <div className="w-full flex gap-4 items-center justify-start cursor-pointer rounded-full hover:bg-slate-100 p-2">
                        <button onClick={() => setOpenModal(true)}>
                            <div className="w-2 h-2">
                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                            </div>
                            <span className="text-gray-600"> Logout </span>
                        </button>
                    </div>
                </div>
            </div>
            <ModalLogoutConfirmation
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    )
}