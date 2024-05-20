import React from 'react'
import { Outlet } from 'react-router-dom'
import Table from '../Table/Table'
import SearchFields from "../SearchFields/SearchFields"
function Body(props) {
  const {loading } = props
  return (
    <div>
        <SearchFields></SearchFields>
        {loading ?<div className="flex align-items-center justify-content-center"> <p>Loading...</p></div> : <Table></Table>}

    </div>
  )
}

export default Body
