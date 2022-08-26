import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input, Label, Modals } from 'components'
import { getUserToken } from 'lib/authService'
import { postPrisoners } from 'lib/axios'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

const ModalAddPrisoner = ({ isOpen, onClose }) => {
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState(false)
    const [value, setValue] = useState({
        nama: '',
        nik: '',
        status: 'Nonaktif',
    })

    const saveData = () => {
        setErrorMsg(false)
        const token = getUserToken();
        if (token) {
            postPrisoners(token, value).then(res => {
                if (res.data) {
                    router.push('/dashboard/warga-binaan/?success=true')
                    onClose()
                }
            }).catch(err => {
                setErrorMsg(true)
            })
        } else {
            router.push('/auth')
        }
    }

    return (
        <Modals
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className='w-full flex flex-col justify-start items-center gap-4'>
                <div className='w-full p-1 flex justify-between items-center'>
                    <h1 className='text-xl font-semibold'>Tambah Warga Binaan</h1>
                    <div className='w-2 h-2 flex items-center justify-center'>
                        <FontAwesomeIcon
                            icon={faClose}
                            className='cursor-pointer'
                            onClick={onClose}
                        />
                    </div>
                </div>
                <div className='w-full flex flex-col justify-start items-center gap-3 p-2'>
                    <div className='w-full flex flex-col gap-2'>
                        {
                            errorMsg &&
                            <div className='w-full p-2 bg-red-200  rounded-md'>
                                <p className='text-sm text-red-600'>
                                    Ada masalah saat menambah data
                                </p>
                            </div>
                        }
                        <Label forInput="nama" value="Nama Warga Binaan / Tahanan" />
                        <Input
                            type="text"
                            name="nama"
                            value={value.nama}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            isFocused={true}
                            handleChange={(e) => {
                                setValue({ ...value, nama: e.target.value })
                                setErrorMsg(false)
                            }}
                            required={true}
                        />

                    </div>
                    <div className='w-full'>
                        <Label forInput="nik" value="Nomor Agenda" />
                        <Input
                            type="text"
                            name="nik"
                            value={value.nik}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            isFocused={false}
                            handleChange={(e) => setValue({ ...value, nik: e.target.value })}
                            required={true}
                        />
                    </div>
                </div>

                <div className='w-full flex justify-end items-center p-2'>
                    <button className='p-2 text-white text-md bg-blue-500 rounded-md disabled:bg-slate-400'
                        onClick={saveData}
                        disabled={!value.nama ? true : false}
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </Modals>
    )
}

export default ModalAddPrisoner