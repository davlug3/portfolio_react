import React, { useEffect, useMemo, useState} from 'react'
import { useAppSearch } from '../../context/app-search'
import { Song, useData } from '../../context/data'
import { DataTable, DataTableProps, SortOrder  } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator, PaginatorChangeEvent, PaginatorPageChangeEvent  } from 'primereact/paginator';
import { db } from '../../db';
import { SearchFieldOptionType } from '../SearchFields/SearchFields';




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

        const data = await db.songs
        .filter((song: Song)=> {
            

          const returnThis:boolean[] = []
          Object.keys(searchState.search_fields).forEach((field:string)=> {
            const value = searchState.search_fields[field].value
            const subReturnThis:boolean[] = []
            let temp:string[] | SearchFieldOptionType[] = []
            const song_db_val = song[field === 'artist' ? "Artist" : field] as string;
            
            if (Array.isArray(value)) temp = value;
            else  temp = [value] 

//////////////////////////////
            if (!temp.length) {
              subReturnThis.push(true);
              return
            }

            temp.forEach(x=> {

                if (typeof x === 'string') {
                  if (x.trim()!=='') subReturnThis.push((new RegExp(x, 'i').test(song_db_val)))
                  else subReturnThis.push(true)
                  return
                }
                else if (x.key) {
                  subReturnThis.push((new RegExp(x.key, 'i').test(song_db_val)))
                  return
                }
                subReturnThis.push(true)
                return
            })
            returnThis.push(subReturnThis.reduce((prev, curr)=> prev || curr, false))
          })
          return returnThis.reduce((prev, curr)=> prev && curr, true)
        })
        .reverse()
        .offset(first)
        .limit(rows)
        .toArray()

        setVisibleData(data);
      }

      fetchData();
    }, [first, rows, searchState.search_fields, sortField, sortOrder])


    
    const onPageChange = (event: PaginatorPageChangeEvent ) => {
      setFirst(event.first);
      setRows(event.rows);
    }



   const table = useMemo<React.ReactNode>(()=> {
    return (
     <DataTable size='small' value={visibleData} sortField={sortField} sortOrder={sortOrder}>
          <Column field="count" header="C" sortable></Column>
      {Object.keys(searchState.search_fields).map(field => {
        return <Column key={field} field={field === "artist" ? "Artist" : field} header={searchState.search_fields[field].label} sortable></Column>
      })}
          

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

