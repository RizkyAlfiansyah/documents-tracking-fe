import Modal from 'components/modal'
import React from 'react'

const ModalLogoutConfirmation = ({ isOpen, onClose }) => {

    const handleLogout = () => {
        localStorage.removeItem('token')
        onClose()
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className='w-full flex flex-col justify-center items-center gap-4 p-2'>
                <p> Apakah anda yakin ingin keluar ? </p>
                <div className='w-full flex justify-end items-center gap-4'>
                    <button className='px-2 py-1 bg-red-500 text-white rounded-md' onClick={handleLogout}>
                        Ya, Keluar
                    </button>
                    <button className='px-2 py-1 border border-black rounded-md' onClick={() => onClose()}>
                        Batal
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ModalLogoutConfirmation