import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input, Label, Modals } from 'components'
import { getUserToken } from 'lib/authService'
import { getPrisoners, postCheckpoint, postPengajuan } from 'lib/axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ReactSelect from 'react-select'
import moment from 'moment'

const ModalAddPengajuan = ({ isOpen, onClose }) => {
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState(false)
    const [value, setValue] = useState({
        nama: '',
        nik: '',
        status: 'Aktif',
        checkpoint: 'checkpoint 1',
    })
    const [check, setCheck] = useState({
        id_pengajuan: '',
        pesan: '',
        waktu: new Date(),
    });
    const [data, setData] = useState([])
    const [options, setOptions] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token')
            if (token) {
                await getPrisoners(token).then(res => {
                    setData(res.data)
                    let tempData = []

                    res.data.map(item => {
                        tempData.push({
                            value: item.nama,
                            label: item.nama,
                        })
                    })

                    setOptions(tempData)
                })
            } else {
                router.push('/auth')
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (data.length > 0) {
            let tempData = [];
            data.find(item => {
                item.nama === value.nama ? tempData.push(item.nik) : null;
            })
            setValue({
                ...value,
                nik: tempData
            })
        }
    }, [errorMsg, value.nama]);

    const saveData = () => {
        setErrorMsg(false)
        const token = getUserToken();
        if (token) {
            postPengajuan(token, value).then(res => {
                if (res.data) {
                    let check = {};
                    check.id_pengajuan = res.data.id;
                    check.pesan = 'Resi Telah Dibuat';
                    check.waktu = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                    postCheckpoint(token, check).then(res => {
                        if (res.data) {
                            router.push('/dashboard/pengajuan?success=true');
                            setValue({
                                ...value,
                                nama: '',
                                nik: '',
                            })
                            onClose();
                        }
                    }).catch(err => {
                        setErrorMsg(true)
                    });
                }
            }).catch(err => {
                setErrorMsg(true)
                // console.log(err);
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
                    <FontAwesomeIcon
                        icon={faClose}
                        className='cursor-pointer'
                        onClick={() => {
                            onClose()
                            setValue({
                                ...value,
                                nama: '',
                                nik: '',
                            })
                        }}
                    />
                </div>
                <div className='w-full flex flex-col justify-start items-center gap-3 p-2'>
                    <div className='w-full flex flex-col gap-2'>
                        {
                            errorMsg &&
                            <div className='w-full p-2 bg-red-200  rounded-md'>
                                <p className='text-sm text-red-600'>
                                    Pengajuan Telah Terdaftar
                                </p>
                            </div>
                        }
                        <Label forInput="nama" value="Nama Warga Binaan / Tahanan" />
                        <div className='w-full cursor-pointer'>
                            <ReactSelect
                                options={options}
                                onChange={(e) => {
                                    data.find(item => {
                                        item.nama === e.value ? setValue({
                                            ...value,
                                            nama: item.nama,
                                            nik: item.nik
                                        }) : null;
                                    })
                                }}
                                className='w-full cursor-pointer'
                                placeholder='Pilih Nama'
                            />
                        </div>
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
                            required={true}
                            disabled={true}
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

export default ModalAddPengajuan