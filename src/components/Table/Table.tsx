import React, { useMemo, useState} from 'react'
import { useAppSearch } from '../../context/app-search'
import { useData } from '../../context/data'
import { DataTable  } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator, PaginatorChangeEvent, PaginatorPageChangeEvent  } from 'primereact/paginator';
import { Song } from '../../context/data';
function Table() {
    const [searchState, searchDispatch] = useAppSearch();
    const [dataState, dataDispatch] = useData();

    const [first, setFirst ] = useState(0)
    const [rows, setRows] = useState(100)




    const visibleData = useMemo<Song[]>(() => {
      return dataState.data.filter((x, i)=> {
        const cond_paging = i >= first && i < first+rows

        return cond_paging
      })
    }, [dataState.data, first, rows])


    const onPageChange = (event: PaginatorPageChangeEvent ) => {
      setFirst(event.first);
      setRows(event.rows);
    }

  return (
    <div> 
      <DataTable value={visibleData}>
        <Column field="count" header="Score"></Column>
        <Column field="title" header="Title"></Column>
        <Column field="Artist" header="Artist"></Column>
        <Column field="genre" header="Genre"></Column>
        <Column field="year" header="Year"></Column>
        <Column field="tempo" header="Tempo"></Column>
      </DataTable>


      <Paginator first={first} rows={rows} totalRecords={dataState.data.length} onPageChange={onPageChange}></Paginator>
    </div>
  )
}

export default Table

