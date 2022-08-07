import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Search = ({ onChange, type, onClear, value, placeholder }) => {


    return (
        <div className='relative bg-white flex justify-evenly gap-2 px-2 items-center rounded-md'>
            <input
                type={type}
                placeholder={placeholder}
                className='w-40 border-none rounded-md px-0 py-0 focus:outline-none focus:ring-0'
                onChange={onChange}
                value={value}
            />
            <FontAwesomeIcon
                icon={faClose}
                className=' text-gray-500 cursor-pointer'
                onClick={onClear}
            />
        </div>
    )
}

export default Search