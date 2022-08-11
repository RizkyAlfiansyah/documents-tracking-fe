import { faCircleExclamation, faPencil, faPlus, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ModalAddPrisoner, ModalConfirmationDelete, ModalEditPrisoner, Search } from 'components'
import HomePage from 'layout/Homepage'
import { getPengajuan, getPrisoners } from 'lib/axios'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'

const Pengajuan = () => {
    const router = useRouter()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [dataEditId, setDataEditId] = useState(null)
    const [dataDeleteId, setDataDeleteId] = useState([])
    const [filterText, setFilterText] = React.useState('');

    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = data.filter(
        item => item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase()),
    );
    const dataEdit = useMemo(() => {
        return data.find(item => item.id === dataEditId)
    }, [dataEditId])
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);

    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, []);

    useEffect(() => {
        if (router?.query) {
            if (router.query.edited) {
                toast.success("Data berhasil diubah")
            } else if (router.query.deleted) {
                toast.success("Data berhasil dihapus")
            } else if (router.query.success) {
                toast.success("Data berhasil ditambahkan")
            }
        }
        const fetchData = async () => {
            const token = localStorage.getItem('token')
            setLoading(true)
            await getPengajuan(token).then(res => {
                setData(res.data)
                setLoading(false)
            })
        }
        fetchData()
    }, [router])

    const columns = [
        {
            name: 'NO',
            selector: (row, index) => index + 1,
            center: true,
            grow: 0,

        },
        {
            name: 'RESI',
            selector: row => <div className='text-xs'>
                {row.resi}
            </div>,
            center: true,
            grow: 0.5,
        },
        {
            name: 'Nama',
            selector: row => <div className='text-xs'>
                {row.nama}
            </div>,
        },
        {
            name: 'Status Pengajuan',
            selector: row => <div className={`w-14 p-1 text-xs text-center ${row.status === 'Aktif' ? 'bg-orange-400' : 'bg-zinc-400'} m-auto text-white rounded-lg`}>
                {row.status}
            </div>,
            center: true,
        },
        {
            name: 'Checkpoint',
            selector: row => <div className='text-xs'>
                {row.checkpoint}
            </div>,
        },
        {
            cell: row => <button className='flex items-center gap-1 bg-cyan-600 hover:bg-cyan-500 px-4 py-1 text-white text-xs rounded-lg'
                onClick={() => {
                    // setOpenModalEdit(true)
                    // setDataEditId(row.id)
                    // console.log("row", row)
                }}
            >
                <FontAwesomeIcon icon={faCircleExclamation} />
                detail
            </button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }


    ]

    const contextActions = React.useMemo(() => {
        const handleDelete = () => {
            setDataDeleteId(selectedRows.map(row => row.id))
            setToggleCleared(!toggleCleared);
            setSelectedRows([]);
            setOpenModalDelete(true);
        };

        return (
            <button key="delete" onClick={handleDelete} className='flex items-center gap-1 bg-red-600 hover:bg-red-700 px-4 py-1 text-white text-xs rounded-lg'>
                <FontAwesomeIcon icon={faTrash} className='text-white' />
                Delete
            </button>
        );
    }, [data, selectedRows, toggleCleared]);

    return (
        <>
            <HomePage title="Warga Binaan">
                <div className='w-full p-2 flex flex-col gap-2'>
                    <div className='w-full flex justify-end items-center gap-2'>
                        <div className='w-52 border border-gray-400 rounded-sm'>
                            <Search
                                onChange={e => setFilterText(e.target.value)}
                                onClear={() => {
                                    setFilterText('')
                                    setResetPaginationToggle(!resetPaginationToggle);
                                }}
                                value={filterText}
                                placeholder="Cari nama"
                            />
                        </div>
                        <button className='bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold py-2 px-4 rounded'>
                            <FontAwesomeIcon
                                icon={faUpload}
                                className='mr-2'
                            />
                            Export Data
                        </button>
                        <button className='bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2 px-4 rounded'
                            onClick={() => setModal(true)}
                        >
                            <FontAwesomeIcon
                                icon={faPlus}
                                className='mr-2'
                            />
                            Buat Pengajuan
                        </button>
                    </div>
                    <div className='w-full p-2'>
                        <DataTable
                            title="Data Warga Binaan"
                            columns={columns}
                            data={filteredItems}
                            pagination
                            contextActions={contextActions}
                            onSelectedRowsChange={handleRowSelected}
                            clearSelectedRows={toggleCleared}
                            progressPending={loading}
                            paginationResetDefaultPage={resetPaginationToggle}
                            selectableRows
                        />
                    </div>
                </div>
            </HomePage>
            <ModalAddPrisoner
                isOpen={modal}
                onClose={() => setModal(false)}
            />
            <ModalEditPrisoner
                isOpen={openModalEdit}
                onClose={() => setOpenModalEdit(false)}
                data={dataEdit}
            />
            <ModalConfirmationDelete
                isOpen={openModalDelete}
                onClose={() => setOpenModalDelete(false)}
                data={{ id: dataDeleteId }}
            />
            <Toaster />
        </>
    )
}

export default Pengajuan