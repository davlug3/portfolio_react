import React, { useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { useAppSearch } from '../../context/app-search'
import { MultiSelect } from 'primereact/multiselect'
import { db } from '../../db'

export type SearchFieldType = {
    key: string, 
    label: string,
    value: string | string[], 
    disabled: boolean, 
    as : string,
    emmit?: (e: React.FormEvent<HTMLInputElement>)=> void,
    options? : SearchFieldOptionType[] | null
}

export interface SearchFieldOptionType  {
  key: string;
  label: string; 
  disabled: boolean;
}


const componentMap : Record<string, React.ComponentType<any>> = {
    InputText, 
    MultiSelect
}


function SearchFields() {
  const [state, dispatch] = useAppSearch();
  const { search_fields} = state;


  useEffect(()=> {
    const fetchDropdowns = async () => {
      const genres = db.getDistinctGenres();
      const years = db.getDistinctYears();
      const tempos =  db.getDistinctTempos();
      
      const x  = await Promise.all([genres, years, tempos])
      dispatch({type: "SET_OPTIONS", payload: {key: 3, value: null, options: x[2]}})
      dispatch({type: "SET_OPTIONS", payload: {key: 2, value: null, options: x[1]}})
      dispatch({type: "SET_OPTIONS", payload: {key: 4, value: null, options: x[0]}})
    }

    fetchDropdowns()
  }, [])


  const changeMe = (e: React.FormEvent<HTMLInputElement>, callback: SearchFieldType["emmit"]) :void => {
    if (callback !== undefined) {
        callback(e)
    }
  }

  return (
    <div className='flex flex-wrap'>

        {
            search_fields.map((field , index)=> {
                const DynamicElement = componentMap[field.as];
                return (
                    <div className="flex flex-column min-w-min flex-1 max-w-full p-1 mb-2" key={`field_${field.key}`}>
                        <label htmlFor="">{field.label}</label>
                        <DynamicElement
                          value={field.value}
                          options={field.options}
                          onChange={(e)=> dispatch({type: "UPDATE_SEARCH_FIELD_VALUE", payload: {key: index, value: e.target.value }})}>
                        </DynamicElement>
                    </div>
                )
            })
        }

    </div>
  )
}

export default SearchFields
