import { Header, PageHead } from 'layout'
import React from 'react'
import Sidebar from './main/sidebar'

const HomePage = ({ children, title }) => {

    return (
        <>
            <PageHead
                title={title}
            />
            <div className='w-full h-screen bg-primary flex flex-row'>
                <div className='lg:w-60 w-4/12 min-h-screen bg-white'>
                    <Sidebar />
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <Header
                        title={title}
                    />
                    <div className='w-full flex flex-col xl:px-6 xl:py-4 px-2 py-4 gap-4 overflow-auto'>
                        <div className='w-full h-screen-80 bg-white shadow-sm rounded-sm overflow-auto'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage