import { PageHead } from 'layout'
import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'

const Home = () => {
    const router = useRouter()
    const [data, setData] = useState()
    const [error, setError] = useState(false)

    useEffect(() => {
        if (router.query.resi) {
            setData(router.query.resi)
        } else {
            setError(true)
        }
    }, [router])

    return (
        <div>
            <PageHead
                title="Resi Download"
            />
            <div className='flex w-full min-h-screen justify-center items-center p-2'>
                {
                    error ?
                        (
                            <p className='text-bold'>
                                Resi Tidak Tersedia !
                            </p>
                        )
                        :
                        <QRCodeCanvas
                            value={`https://lacak-dokumen.vercel.app/order?resi=${data}`}
                        />
                }
            </div>
        </div>
    )
}

export default Home