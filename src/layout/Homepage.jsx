import Head from 'next/head'
import React from 'react'
import Sidebar from './main/sidebar'

const HomePage = ({ children }) => {

    return (
        <>
            <Head
                title={"Homepage"}
            />
            <div className='w-full h-screen bg-primary flex flex-row xl:gap-10'>
                <div className='lg:w-60 w-4/12 min-h-screen bg-white'>
                    <Sidebar />
                </div>
                <div className='w-full flex flex-col xl:px-6 xl:py-4 px-2 py-4 gap-4 overflow-auto'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default HomePage