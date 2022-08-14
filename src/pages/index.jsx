import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faSearch } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useHeaderStore } from 'store'
import { useRouter } from 'next/router'

export default function Welcome() {
    const router = useRouter()
    const { handleChangeTitleAction } = useHeaderStore()
    const [data, setData] = useState("")


    useEffect(() => {
        handleChangeTitleAction({
            title: 'Welcome',
            onBack: null,
        });

    }, []);

    const submitResi = () => {
        if (data) {
            router.push('/order?resi=' + data)
        }
    }

    return (
        <>
            <div className='flex w-full h-screen-80'>
                <div className='w-full flex flex-col' style={{ background: 'linear-gradient(21deg, rgba(81,226,255,1) 23%, rgba(39,111,201,1) 100%, rgba(2,0,36,1) 100%)' }}>
                    <div className='w-full flex justify-end gap-4 p-8'>
                        <span className='flex gap-2 items-center text-secondary text-md border-2 border-secondary rounded-lg px-2 cursor-pointer'>
                            <div className='w-2 h-2 flex justify-center items-center'>
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            Hubungi Kami</span>
                    </div>
                    <div className='w-full h-96 lg:p-28 p-4 flex flex-col items-end justify-end gap-4'>
                        <span
                            className='text-white text-3xl font-bold lg:mt-auto mx-auto mt-auto'
                        >
                            LPKA Maros
                        </span>
                        <div className='sm:w-80 w-full relative flex items-center lg:justify-start sm:justify-center lg:mb-auto mx-auto mb-auto bg-white rounded-md gap-0'>
                            <div className='px-3 border-r-2'>
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                            <input type="text" value={data} className='px-1 py-2 w-5/6 border-none focus:outline-none focus:ring-0' placeholder='Masukkan Nomor Resi'
                                onChange={(e) => setData(e.target.value)}
                            />
                            <button className='p-2 bg-slate-800 text-md text-white rounded-r-md' onClick={submitResi}>
                                Lacak
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <footer
                className='flex flex-col gap-2 p-2 justify-center items-center w-full h-full'
            >
                <span className='text-sm'>LPKA Maros 2022</span>
                <span className='text-sm text-center'>Copyright © 2022 Kementrian Hukum dan HAM Republik Indonesia</span>
            </footer>
        </>
    )
}
