import { faAdd, faClose, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'components/modal';
import { getPengajuan, getPengajuanById, postCheckpoint } from 'lib/axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react'

const ModalDetailPengajuan = ({ data, isOpen, onClose }) => {
    const router = useRouter()
    const [checkPoint, setCheckPoint] = useState(1);
    const [check, setCheck] = useState({
        id_pengajuan: '',
        pesan: '',
        waktu: new Date(),
    });
    const [datas, setDatas] = useState([]);

    useMemo(() => {
        var dateStringWithTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        setCheck({
            ...check,
            id_pengajuan: data,
            waktu: dateStringWithTime,
        })
    }, [data]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getPengajuanById(token, data).then(res => {
                setDatas(res.data);
            })
        } else {
            router.push('/auth');
        }
    }, [data]);

    const handleSubmit = () => {
        const token = localStorage.getItem('token');
        if (token) {
            postCheckpoint(token, check).then(res => {
                router.push('/dashboard/pengajuan?success=true');
                onClose();
            }).catch(err => {
                router.push('/dashboard/pengajuan?success=false');
            });
        } else {
            router.push('/auth');
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => onClose()}
        >
            <div className='w-full h-full flex flex-col gap-6 items-start justify-center'>
                <div className="w-full flex items-center justify-between">
                    <span className='font-bold'>Detail Pengajuan</span>
                    <div className='w-2 h-2 flex items-center justify-center'>
                        <FontAwesomeIcon
                            icon={faClose}
                            onClick={() => {
                                onClose()
                                setCheckPoint(1)
                            }}
                            className='cursor-pointer'
                        />
                    </div>
                </div>
                <div className='w-full p-0 flex flex-col items-start justify-center'>
                    <div className="w-full bg-gray-200 p-2 rounded-md">
                        <div className="w-full flex flex-col gap-2">
                            <div className="w-full flex items-start justify-start gap-28">
                                <label htmlFor="">
                                    Nama
                                </label>
                                <label htmlFor="" className="text-md font-bold ml-3">
                                    {datas.nama}
                                </label>
                            </div>
                            <div className="w-full flex items-start justify-between gap-10">
                                <label htmlFor="">
                                    Nomor Resi
                                </label>
                                <label htmlFor="" className="text-md font-bold">
                                    {datas.resi}
                                </label>
                                <button className='p-1 px-2 text-sm bg-cyan-700 hover:bg-cyan-500 text-white rounded-md flex gap-2'>
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                    />
                                    Print Resi
                                </button>
                            </div>
                        </div>
                    </div>
                    <label className='text-md font-bold mt-2'>Status Paket</label>
                    <div className="w-full h-56 flex flex-col gap-2 pr-3">
                        <div className='w-full h-56 flex flex-col overflow-auto'>
                            {
                                datas.checkpoints?.sort((a, b) => a.id - b.id).map((item, index) => {
                                    return (
                                        <div className="w-full flex items-center justify-between border-b-2 pb-2" key={index}>
                                            <label htmlFor="cp1">Checkpoint {index + 1}</label>
                                            <input type="text" className="w-8/12 p-1 m-0 focus:outline-none focus:ring-0 rounded-sm mt-2 disabled:bg-slate-300" value={item?.pesan} disabled />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="w-full flex items-center justify-between border-b-2 pb-2" >
                            <label htmlFor="cp1">Checkpoint {datas?.checkpoints?.length + 1}</label>
                            <input type="text" className="w-8/12 p-1 m-0 border border-gray-400 focus:outline-none focus:ring-0 rounded-sm mt-2"
                                onChange={(e) => setCheck({ ...check, pesan: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div className='w-full flex items-center justify-end'>
                    <button className='bg-blue-600 hover:bg-blue-500 text-white rounded-md px-4 py-2'
                        onClick={() => handleSubmit()}
                    >
                        Update
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ModalDetailPengajuan