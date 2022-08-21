
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PageHead } from 'layout';
import { getResiById } from 'lib/axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Main() {
    const router = useRouter()
    const [data, setData] = useState([])

    useEffect(() => {
        if (router.query.resi) {
            getResiById(router.query.resi).then(res => {
                setData(res.data)
            })
        }
    }, [router]);

    return (
        <>
            <PageHead title="Track Order" description="Document Tracking" />
            <div className='w-full flex flex-col gap-4 min-h-screen bg-primary'>
                <div className='w-full p-4' style={{ background: 'linear-gradient(273deg, rgba(81,226,255,1) 23%, rgba(39,111,201,1) 100%, rgba(2,0,36,1) 100%)' }}>
                    <p className='text-2xl text-white font-bold'>
                        Lacak Dokumen
                    </p>
                </div>
                <div className='w-full p-2 lg:px-40 sm:p-2 flex lg:flex-row sm:flex-col flex-col gap-2'>
                    <div className='lg:w-5/12 w-full bg-white p-2 flex flex-col gap-2'>
                        <p className='text-xl text-gray-700 font-extrabold'>Informasi Berkas</p>
                        <div className='w-full flex flex-col items-start justify-between'>
                            <p className='text-md text-gray-500'>
                                Nama Warga Binaan
                            </p>
                            <div className='text-md font-extrabold'>
                                {data?.nama || "Memuat Data ..."}
                            </div>
                        </div>
                        <div className='w-full flex flex-col items-start justify-between'>
                            <p className='text-md text-gray-500'>
                                Nomor Resi
                            </p>
                            <p className='text-md font-extrabold'>
                                {data?.resi || "Memuat Data ..."}
                            </p>
                        </div>
                    </div>
                    <div className='w-full bg-white p-2'>
                        <p className='text-xl text-green-500 font-bold border-b-2'>Update Status Berkas</p>
                        <div className='w-full p-2'>
                            <div className='w-full flex flex-col justify-end items-start'>
                                {
                                    data?.checkpoints?.length >= 1 ?
                                        data?.checkpoints?.map((item, index) => {
                                            return (
                                                <>
                                                    <div className='w-full relative flex gap-2 justify-start items-center' key={index}>
                                                        <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-green-400' : 'bg-gray-400'}`}>
                                                        </div>
                                                        <div className='w-4/12 md:w-5/12 xl:w-2/12 text-xs'>
                                                            {item.waktu || <Skeleton />}
                                                        </div>
                                                        <div className={`w-8/12 md:w-7/12 text-xs ${index === 0 ? 'text-green-600' : "text-gray-500"} font-semibold`}>
                                                            {item.pesan || <Skeleton />}
                                                        </div>
                                                    </div>
                                                    {
                                                        index !== data?.checkpoints?.length - 1 &&
                                                        <div className='h-10 border-1 border-gray-300 ml-1'></div>
                                                    }
                                                </>
                                            )
                                        })
                                        :
                                        <div className='w-full flex items-center justify-center text-black font-semibold text-md'>
                                            <p>
                                                Memuat Data ...
                                            </p>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
