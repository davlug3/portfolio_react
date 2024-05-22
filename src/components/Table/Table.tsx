import React, { useEffect, useMemo, useState} from 'react'
import { useAppSearch } from '../../context/app-search'
import { Song, useData } from '../../context/data'
import { DataTable, DataTableProps, SortOrder  } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator, PaginatorChangeEvent, PaginatorPageChangeEvent  } from 'primereact/paginator';
import { db } from '../../db';

function Table() {
    const [searchState, searchDispatch] = useAppSearch();
    const [dataState, dataDispatch] = useData();

    const [first, setFirst ] = useState(0)
    const [rows, setRows] = useState(100)

    const [totalRecords, setTotalRecords] = useState(0);
    const [visibleData, setVisibleData] = useState<Song[] | []>([]);

    const [sortField, setSortField] = useState<string>('count'); 
    const [sortOrder, setSortOrder] = useState<SortOrder>(-1);

    

    useEffect(()=> {
      console.log("useeffect in Table.ts");
      const fetchData = async() => {
        const total = await db.songs.count()
        setTotalRecords(total);

        // const data = await db.songs
        // .where(Object.keys(searchState.search_fields))
        // .startsWithAnyOfIgnoreCase(Object.keys(searchState.search_fields).map((x:unknown)=> ("love")))
        // .reverse()
        // .offset(first)
        // .limit(rows)
        // .toArray();
        // console.log("data: ", data);

        const data = await db.songs
        .filter((song: Song)=> {
          const returnThis:boolean[] = []
          Object.keys(searchState.search_fields).forEach((field:string)=> {
            const subReturnThis:boolean[] = []
            if (Array.isArray(searchState.search_fields[field].value)) {
              searchState.search_fields[field].value.forEach((element:string) => {
                subReturnThis.push((new RegExp(element)).test(song[field === 'artist' ? 'Artist' : field]))
              });
            }
            returnThis.push(subReturnThis.reduce((prev, curr)=> prev || curr, false))
          })
          return returnThis.reduce((prev, curr)=> prev && curr, true)
        })
        .toArray()

        setVisibleData(data);
      }

      fetchData();
    }, [first, rows, sortField, sortOrder])


    
    const onPageChange = (event: PaginatorPageChangeEvent ) => {
      setFirst(event.first);
      setRows(event.rows);
    }



   const table = useMemo<React.ReactNode>(()=> {
    return (
     <DataTable value={visibleData} sortField={sortField} sortOrder={sortOrder}>
          <Column field="count" header="Score" sortable></Column>
          <Column field="title" header="Title" sortable></Column>
          <Column field="Artist" header="Artist" sortable></Column>
          <Column field="genre" header="Genre" sortable></Column>
          <Column field="year" header="Year" sortable></Column>
          <Column field="tempo" header="Tempo" sortable></Column>
        </DataTable> )
   }, [visibleData, sortField, sortOrder])

  return (
    <div> 
        
      {table}      
      


      <Paginator first={first} rows={rows} totalRecords={totalRecords} onPageChange={onPageChange}></Paginator>
    </div>
  )
}

export default Table

