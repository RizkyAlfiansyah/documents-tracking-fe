import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input, Label, Modals } from 'components'
import { getUserToken } from 'lib/authService'
import { editPrisoners } from 'lib/axios'
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

const ModalAddPrisoner = ({ isOpen, onClose, data }) => {
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState(false)
    const [value, setValue] = useState({
        nik: "",
        nama: "",
        status: "Nonaktif",
        id_prisoner: "",
    });

    useMemo(() => {
        setValue({
            id: data?.id,
            nik: data?.nik,
            nama: data?.nama,
            status: data?.status,
            id_prisoner: data?.id_prisoner,
        });
    }, [data]);

    const editData = async () => {
        setErrorMsg(false)
        const token = getUserToken();
        if (token) {
            await editPrisoners(token, value).then(res => {
                if (res.data) {
                    router.push('/dashboard/warga-binaan/?edited=true')
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
                    <h1 className='text-xl font-semibold'>Edit Data Warga Binaan</h1>
                    <FontAwesomeIcon
                        icon={faClose}
                        className='cursor-pointer'
                        onClick={onClose}
                    />
                </div>
                <div className='w-full flex flex-col justify-start items-center gap-3 p-2'>
                    <div className='w-full'>
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
                        />
                        {
                            errorMsg &&
                            <div className='w-full p-2 bg-red-200  rounded-md my-2'>
                                <p className='text-sm text-red-600'>
                                    Field Nama tidak boleh kosong !
                                </p>
                            </div>
                        }
                    </div>
                    <div className='w-full'>
                        <Label forInput="nik" value="Nomor Induk Keluarga" />
                        <Input
                            type="text"
                            name="nik"
                            value={value.nik}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            isFocused={false}
                            handleChange={(e) => setValue({ ...value, nik: e.target.value })}
                        />
                    </div>
                    <div className='w-full border border-gray-400 p-2 mt-2 rounded-sm'>
                        <Label forInput="status" value="Status" />
                        <div className='w-full flex gap-4'>
                            <input
                                type="radio"
                                name="status"
                                defaultValue="Aktif"
                                onChange={(e) => setValue({ ...value, status: "Aktif" })}
                                // {...(data?.status === "Nonaktif" ? { checked: true } : {})}
                                className="ml-2 cursor-pointer"
                                checked={value.status === "Aktif" ? true : false}
                            /> Aktif
                            <input
                                type="radio"
                                name="status"
                                defaultValue="Nonaktif"
                                onChange={(e) => setValue({ ...value, status: "Nonaktif" })}
                                className='ml-2 cursor-pointer'
                                checked={value.status === "Nonaktif" ? true : false}
                            /> Nonaktif
                        </div>
                    </div>
                </div>

                <div className='w-full flex justify-end items-center p-2 '>
                    <button className='p-2 text-white text-md bg-blue-500 rounded-md disabled:bg-slate-400'
                        onClick={editData}
                        disabled={value.nama === "" ? true : false}
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </Modals>
    )
}

export default ModalAddPrisoner