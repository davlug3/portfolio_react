import React from 'react'
import { useAppSearch } from '../../context/app-search'
import { useData } from '../../context/data'
import { DataTable  } from 'primereact/datatable';
import { Column } from 'primereact/column';
function Table() {
    const [searchState, searchDispatch] = useAppSearch();
    const [dataState, dataDispatch] = useData();
  return (
    <div> 

    </div>
  )
}

export default Table

