import React from 'react'
import Navebar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const layout = () => {
  return (
    <div>
        <Navebar/>
        <Outlet/>
    </div>
  )
}

export default layout