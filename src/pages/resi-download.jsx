import { PageHead } from 'layout'
import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'
import LogoPNG from "assets/kumham-logo.png";
import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
    const router = useRouter()
    const [data, setData] = useState()
    const [error, setError] = useState(false)

    useEffect(() => {
        if (router.query.resi || localStorage.getItem('code')) {
            setData(JSON.parse(localStorage.getItem('code')))
        } else {
            setError(true)
        }
    }, [router])

    console.log(data?.resi)

    return (
        <div>
            <PageHead
                title="Resi Download"
            />
            <div className='relative flex flex-col w-full min-h-screen justify-start items-center p-4'>
                <div className='container relative flex flex-col gap-2 p-2'>
                    <div className='w-full flex gap-8 justify-center items-center'>
                        <div className="flex justify-start items-center">
                            <Image src={LogoPNG} alt="logo" width="64" height="64"
                            />
                        </div>
                        <div className='flex flex-col justify-start items-center'>
                            <p className='text-sm font-semibold'>
                                KEMENTRIAN HUKUM DAN HAK ASASI MANUSIA
                            </p>
                            <p className='text-sm font-semibold'>
                                KANTOR WILAYAH SULAWESI SELATAN
                            </p>
                            <p className='text-sm font-bold'>
                                LEMBAGA PEMBINAAN KHUSUS ANAK KELAS II MAROS
                            </p>
                            <p className='text-sm'>
                                JL. RAYA KARIANGO KM. 3 MANDAI-MAROS TELP/FAX : ( 0411 )
                            </p>
                        </div>
                    </div>
                    <div className='w-full border-2 border-black'>
                    </div>
                    <div className='w-full flex flex-col justify-start items-start p-2 gap-8'>
                        <p className='text-sm font-semibold'>
                            Lpka Maros
                        </p>
                        <div className='w-auto flex flex-col gap-2 justify-start items-start'>
                            <div className='w-full flex gap-2'>
                                <p className='w-44'>
                                    Nama
                                </p>
                                <p>
                                    : {data?.nama}
                                </p>
                            </div>
                            <div className='w-full flex gap-2'>
                                <p className='w-44'>
                                    Nomor Agenda
                                </p>
                                <p>
                                    : {data?.nik}
                                </p>
                            </div>
                            <div className='w-full flex gap-2'>
                                <p className='w-44'>
                                    Resi
                                </p>
                                <p>
                                    : {data?.resi}
                                </p>
                            </div>
                        </div>
                        <div className='w-full h-60 flex flex-col justify-center items-center gap-8'>
                            <p>
                                Silahkan scan QR code ini untuk melihat status resi
                            </p>
                            {
                                error ?
                                    (
                                        <p className='text-bold'>
                                            Resi Tidak Tersedia !
                                        </p>
                                    )
                                    :
                                    <QRCodeCanvas
                                        value={`https://lacak-dokumen.vercel.app/order?resi=${data?.resi}`}
                                    />
                            }
                        </div>

                        <p>
                            Anda juga dapa mengunjungi laman <span className='text-blue-500'> <Link href='https://lacak-dokumen.vercel.app'>  https://lacak-dokumen.vercel.app  </Link> </span>  dan memasukkan nomor resi yang tertera di atas untuk melihat status resi.
                        </p>
                    </div>
                    <p className='w-full flex justify-end items-center mt-20'>
                        Terima kasih.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Home