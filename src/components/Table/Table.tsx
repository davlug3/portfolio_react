import React, { useEffect, useMemo, useState} from 'react'
import { useAppSearch } from '../../context/app-search'
import { useData } from '../../context/data'
import { DataTable, DataTableProps, SortOrder  } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator, PaginatorChangeEvent, PaginatorPageChangeEvent  } from 'primereact/paginator';
import { Song } from '../../context/data';
import { db } from '../../db';

function Table() {
    const [searchState, searchDispatch] = useAppSearch();
    const [dataState, dataDispatch] = useData();

    const [first, setFirst ] = useState(0)
    const [rows, setRows] = useState(100)

    const [totalRecords, setTotalRecords] = useState(0);
    const [visibleData, setVisibleData] = useState([]);

    const [sortField, setSortField] = useState<string>('count'); 
    const [sortOrder, setSortOrder] = useState<SortOrder>(-1);


    useEffect(()=> {
      const fetchData = async() => {
        const total = await db.songs.count()
        setTotalRecords(total);

        const data = await db.songs
          .orderBy(sortField)
          .reverse()
          .offset(first)
          .limit(rows) 
          .toArray();

        setVisibleData(data);
      }

      fetchData();
    }, [first, rows, sortField, sortOrder])



    // const visibleData = useMemo<Song[]>(() => {
    //   return dataState.data.filter((x, i)=> {
    //     const cond_paging = i >= first && i < first+rows

    //     return cond_paging
    //   })
    // }, [dataState.data, first, rows])
    
    const onPageChange = (event: PaginatorPageChangeEvent ) => {
      setFirst(event.first);
      setRows(event.rows);
    }

  return (
    <div> 
      {/* {sortOrder} */}
      <DataTable value={visibleData} sortField={sortField} sortOrder={sortOrder}>
        <Column field="count" header="Score" sortable></Column>
        <Column field="title" header="Title" sortable></Column>
        <Column field="Artist" header="Artist" sortable></Column>
        <Column field="genre" header="Genre" sortable></Column>
        <Column field="year" header="Year" sortable></Column>
        <Column field="tempo" header="Tempo" sortable></Column>
      </DataTable>


      <Paginator first={first} rows={rows} totalRecords={totalRecords} onPageChange={onPageChange}></Paginator>
    </div>
  )
}

export default Table

