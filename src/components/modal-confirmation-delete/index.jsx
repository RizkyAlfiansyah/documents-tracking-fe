import Modal from 'components/modal'
import { deletePengajuan, deletePrisoners } from 'lib/axios'
import { useRouter } from 'next/router'
import React from 'react'

const ModalConfirmationDelete = ({ isOpen, onClose, data, isPengajuan = false }) => {
    const router = useRouter()

    const handleDelete = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            if (isPengajuan) {
                deletePengajuan(token, data).then(res => {
                    if (res.message) {
                        router.push('/dashboard/pengajuan?deleted=true')
                        onClose()
                    }
                }).catch(err => {
                    router.push('/dashboard/pengajuan?deleted=false')
                })
            } else {
                deletePrisoners(token, data).then(res => {
                    if (res.message) {
                        router.push('/dashboard/warga-binaan?deleted=true')
                        onClose()
                    }
                }).catch(err => {
                    router.push('/dashboard/warga-binaan?deleted=false')
                })
            }
        } else {
            router.push('/auth')
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className='w-full flex flex-col justify-center items-center gap-4 p-2'>
                <p> Hapus data ini ? </p>
                <div className='w-full flex justify-end items-center gap-4'>
                    <button className='px-2 py-1 bg-red-500 text-white rounded-md' onClick={handleDelete}>
                        Ya, Hapus
                    </button>
                    <button className='px-2 py-1 border border-black rounded-md' onClick={() => onClose()}>
                        Batal
                    </button>
                </div>
            </div>

        </Modal>
    )
}

export default ModalConfirmationDelete