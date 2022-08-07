import React, { useState } from "react";
import LogoPNG from "assets/kumham-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faChartColumn, faArrowRightFromBracket, faStairs } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Sidebar() {

    const path = "dashboard"

    return (
        <>
            <div className="w-full h-full bg-white flex flex-col justify-between px-6 py-3">
                <div className="w-full flex flex-col gap-10">
                    <div className="flex w-full justify-center items-center">
                        <Image src={LogoPNG} alt="logo" width="64" height="64"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2 items-center">
                        <div className={`w-full flex gap-4 items-center justify-start cursor-pointer rounded-full hover:bg-slate-100  p-2 ${path == "dashboard" && ("bg-slate-100")}`}
                        >
                            <FontAwesomeIcon icon={faChartColumn} />
                            <span className="text-gray-600 sm:text-sm"> Dashboard </span>
                            {/* <Link href="/dashboard">
                            </Link> */}
                        </div>
                        <div className={`w-full flex gap-4 items-center justify-start cursor-pointer rounded-full hover:bg-slate-100  p-2 ${path == "data" && ("bg-slate-100")}`}>
                            {/* <Link href="data">
                            </Link> */}
                            <FontAwesomeIcon icon={faDatabase} />
                            <span className="text-gray-600 sm:text-sm"> Data Pengajuan </span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex items-center">
                    <div className="w-full flex gap-4 items-center justify-start cursor-pointer rounded-full hover:bg-slate-100 p-2">
                        <button onClick={() => setOpenModal(true)}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                            <span className="text-gray-600"> Logout </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}