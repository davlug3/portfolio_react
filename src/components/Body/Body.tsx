import React from 'react'
import { Outlet } from 'react-router-dom'
import Table from '../Table/Table'
import SearchFields from "../SearchFields/SearchFields"
function Body() {
  return (
    <div>
        <SearchFields></SearchFields>
        <Table></Table> 
        {/* <Outlet></Outlet> */}
    </div>
  )
}

export default Body
