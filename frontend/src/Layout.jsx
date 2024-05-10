import React from 'react'
import { NavbarWithSearch } from './Components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
     <NavbarWithSearch /> 
     <Outlet />
    </>
  )
}

export default Layout
