import React from 'react'

const Header = ({ title }) => {
    return (
        <div className='w-full bg-white shadow-sm p-4 divide-y-2'>
            <p className='text-start text-xl'>
                {title}
            </p>
        </div>
    )
}

export default Header