
import Head from 'next/head';
import React, { useEffect } from 'react'
import { StepperNav } from "vertical-stepper-nav";
import { useRouter } from 'next/router'
import { useHeaderStore } from 'store';
import { PageHead } from 'layout';
import { getPengajuanById, getResiById } from 'lib/axios';

export default function Main() {
    const router = useRouter()

    const { handleChangeTitleAction } = useHeaderStore()

    useEffect(() => {
        handleChangeTitleAction({
            title: 'Track Order',
            onBack: null,
        });
        if (router.query.resi) {
            getResiById(router.query.resi).then(res => {
                console.log(res.data)
            })
        }
    }, []);
    return (
        <>
            <PageHead title="Track Order" description="Document Tracking" />
            <div className='w-full flex flex-col gap-4 min-h-screen bg-primary'>
                <div className='w-full p-4' style={{ background: 'linear-gradient(273deg, rgba(81,226,255,1) 23%, rgba(39,111,201,1) 100%, rgba(2,0,36,1) 100%)' }}>
                    <p className='text-3xl text-white font-bold'>
                        Document Tracker
                    </p>
                </div>
                <div className='w-full p-2 lg:px-40 sm:p-2 flex lg:flex-row sm:flex-col flex-col gap-2'>
                    <div className='lg:w-5/12 w-full bg-white p-2 flex flex-col gap-2'>
                        <p className='text-xl text-gray-700 font-extrabold'>Informasi Paket</p>
                        <div className='w-full flex flex-col items-start justify-between'>
                            <p className='text-md text-gray-500'>
                                Nomor Resi
                            </p>
                            <p className='text-md font-extrabold'>
                                NP0012313123MRS
                            </p>
                        </div>
                    </div>
                    <div className='w-full bg-white p-2'>
                        <p className='text-xl text-green-500 font-bold border-b-2'>Update Status Paket</p>
                        <div className='w-full p-2'>
                            <StepperNav
                                steps={[
                                    {
                                        stepContent: () => <div className='font-thin text-sm'>Step 1</div>,
                                        stepStatusCircleSize: 16,
                                        stepStateColor: "green"
                                    },
                                    {
                                        stepContent: () => <div className='font-thin text-gray-500 text-sm'>Step 2</div>,
                                        stepStatusCircleSize: 16,
                                        stepStateColor: "#F6F6F6"
                                    },
                                    {
                                        stepContent: () => <div className='font-thin text-gray-500 text-sm'>Nomor Resi Pengiriman telah dibuat</div>,
                                        stepStatusCircleSize: 16,
                                        stepStateColor: "#F6F6F6"
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
