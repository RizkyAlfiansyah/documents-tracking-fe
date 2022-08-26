import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Search = ({ onChange, onClear, value, placeholder }) => {

    return (
        <div className='relative bg-white flex justify-start gap-2 items-center rounded-md'>
            <div className='w-full relative'>
                <input
                    type="text"
                    placeholder={placeholder}
                    className='w-11/12 rounded-sm px-2 py-1 focus:outline-none focus:ring-0'
                    onChange={onChange}
                    value={value}
                />
                <div className='w-4 h-4 flex justify-center items-center'>
                    <FontAwesomeIcon
                        icon={faClose}
                        className='absolute text-gray-500 cursor-pointer top-2 right-2'
                        onClick={onClear}
                    />
                </div>
            </div>
        </div>
    )
}

export default Search