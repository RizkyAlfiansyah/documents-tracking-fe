import HomePage from 'layout/Homepage'
import React, { useEffect } from 'react'

const Dashboard = () => {

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    useEffect(() => {
        if (!token) {
            window.location.href = '/auth'
        }
    })
    return (
        <HomePage>
            <div>
                <h1>Dashboard</h1>
            </div>
        </HomePage>
    )
}

export default Dashboard