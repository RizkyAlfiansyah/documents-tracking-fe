import { faPencil, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HomePage from 'layout/Homepage'
import { axios } from 'lib/axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

const WargaBinaan = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await axios.get('/prisoners')
            const data = await response.data
            setData(data.data)
            setLoading(false)
        }
        fetchData()
    }, [])

    // const filteredItems = data?.filter(
    //     item => item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase()),
    // );

    const columns = [
        {
            name: 'NO',
            selector: (row, index) => index + 1,
            center: true,
            grow: 0,

        },
        {
            name: 'NIK',
            selector: row => <div className='text-xs'>
                {row.nik}
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
            name: 'Status',
            selector: row => <div className={`w-14 p-1 text-xs text-center ${row.status === 'Aktif' ? 'bg-orange-400' : 'bg-zinc-400'} m-auto text-white rounded-lg`}>
                {row.status}
            </div>,
            center: true,
        },
        {
            cell: row => <button className='flex items-center gap-1 bg-amber-400 hover:bg-amber-500 px-4 py-1 text-white text-xs rounded-lg'
                onClick={() => {
                    // setOpenModalEdit(true)
                    // setDataEditId(row.id)
                }}
            >
                <FontAwesomeIcon icon={faPencil} />
                edit
            </button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }

    ]
    console.log(data)

    return (
        <HomePage title="Warga Binaan">
            <div className='w-full p-2 flex flex-col gap-2'>
                <div className='w-full flex justify-end items-center gap-2'>
                    <button className='bg-orange-500 hover:bg-orange-700 text-white text-xs font-semibold py-2 px-4 rounded'>
                        <FontAwesomeIcon
                            icon={faUpload}
                            className='mr-2'
                        />
                        Export Data
                    </button>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-4 rounded'>
                        <FontAwesomeIcon
                            icon={faPlus}
                            className='mr-2'
                        />
                        Tambah Warga Binaan
                    </button>
                </div>
                <div className='w-full p-2 border-2 border-gray-300'>
                    <DataTable
                        title="Data Warga Binaan"
                        columns={columns}
                        data={data}
                        pagination={true}
                        // selectableRows
                        // contextActions={contextActions}
                        // onSelectedRowsChange={handleRowSelected}
                        // clearSelectedRows={toggleCleared}
                        progressPending={loading}
                    // paginationResetDefaultPage={resetPaginationToggle}
                    />
                </div>
            </div>
        </HomePage>
    )
}

export default WargaBinaan