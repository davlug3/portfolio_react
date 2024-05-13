import React from 'react'
import { Outlet } from 'react-router-dom'
function Body() {
  return (
    <div>
        <Outlet></Outlet>
    </div>
  )
}

export default Body
