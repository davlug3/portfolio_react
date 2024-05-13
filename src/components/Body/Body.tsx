import React from 'react'
import { Outlet } from 'react-router-dom'
import SearchFields from "../SearchFields/SearchFields"
function Body() {
  return (
    <div>
        <SearchFields></SearchFields>
        {/* <Outlet></Outlet> */}
    </div>
  )
}

export default Body
