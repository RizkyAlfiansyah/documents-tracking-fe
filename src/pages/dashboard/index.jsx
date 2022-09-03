import { Header } from 'layout'
import HomePage from 'layout/Homepage'
import { getPengajuan, getPrisoners } from 'lib/axios'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Fade, Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Image1 from 'assets/dashboard/img1.jpg'
import Image2 from 'assets/dashboard/img2.jpg'
import Image3 from 'assets/dashboard/img3.jpg'
import Image4 from 'assets/dashboard/img4.jpg'
import Image5 from 'assets/dashboard/img5.jpg'
import Image6 from 'assets/dashboard/img6.jpg'
import Image7 from 'assets/dashboard/img7.jpg'
import Image8 from 'assets/dashboard/img8.jpg'
import Image9 from 'assets/dashboard/img9.jpg'
import Image10 from 'assets/dashboard/img10.jpg'
import Image11 from 'assets/dashboard/img11.jpg'
import Image12 from 'assets/dashboard/img12.jpg'

const Dashboard = () => {

    const [data, setData] = useState({
        jumlah_warga_binaan: 0,
        jumlah_pegajuan: 0,
    })

    const slideImages = [
        {
            url: Image1,
            caption: '1'
        },
        {
            url: Image2,
            caption: '2'
        },
        {
            url: Image3,
            caption: '3'
        },
        {
            url: Image4,
            caption: '4'
        },
        {
            url: Image5,
            caption: '5'
        },
        {
            url: Image6,
            caption: '6'
        },
        {
            url: Image7,
            caption: '7'
        },
        {
            url: Image8,
            caption: '8'
        },
        {
            url: Image9,
            caption: '9'
        },
        {
            url: Image10,
            caption: '10'
        },
        {
            url: Image11,
            caption: '11'
        },
        {
            url: Image12,
            caption: '12'
        },

    ]

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')
            // setLoading(true)
            await getPrisoners(token).then(res => {
                setData({
                    jumlah_warga_binaan: res.data.length,
                })
                // setLoading(false)
            })
            await getPengajuan(token).then(res => {
                setData({
                    ...data,
                    jumlah_pegajuan: res.data.length,
                })
                // setLoading(false)
            })
        }
        fetchData()
    }, [])


    const fadeImages = [
        "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
        "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
    ];


    return (
        <HomePage title="Dashboard">
            <div className='w-full flex p-4 justify-between overflow-hidden'>
                <div className='w-4/12 flex flex-col gap-3'>
                    <p className='w-full rounded-md bg-orange-700 p-2 cursor-pointer hover:shadow-xl'>
                        <span className='font-bold text-white'>Alur Proses Pengusulan Cuti Bersyarat</span>
                    </p>
                    <p className='w-full rounded-md bg-blue-700 p-2 cursor-pointer hover:shadow-xl'>
                        <span className='font-bold text-white'>Alur Proses Pengusulan Pembebasan Bersyarat</span>
                    </p>
                    <p className='w-full rounded-md bg-blue-700 p-2 cursor-pointer hover:shadow-xl'>
                        <span className='font-bold text-white'>Alur Proses Pengusulan Asimilasi</span>
                    </p>
                </div>
                <div className='w-8/12 h-full flex justify-center items-center'>
                    <Image src={slideImages[0].url}
                        width="400"
                        height="580"
                    />
                </div>
            </div>
        </HomePage>
    )
}

export default Dashboard