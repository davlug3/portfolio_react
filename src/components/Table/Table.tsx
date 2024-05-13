import React from 'react'
import { useAppSearch } from '../../context/app-search'

function Table() {
    const [state, dispatch] = useAppSearch()
  return (
    <div> 
        This is the table
        {JSON.stringify(state)}
    </div>
  )
}

export default Table

