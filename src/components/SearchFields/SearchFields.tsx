import React, { useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useAppSearch } from '../../context/app-search'
import { MultiSelect } from 'primereact/multiselect'
import { db } from '../../db'
import { InputTextProps } from 'primereact/inputtext'
import { localStorageHelper } from '../../helper/localStorage'

export type SearchFieldType = {
    order: number, 
    label: string,
    value: string | string[], 
    stage: string | SearchFieldOptionType[], 
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


const componentMap : Record<string, React.ForwardRefExoticComponent<InputTextProps & React.RefAttributes<HTMLInputElement>> | typeof MultiSelect>  = {
    InputText, 
    MultiSelect
}


function SearchFields() {
  const [state, dispatch] = useAppSearch();
  const { search_fields} = state;
  const [getLocalStorage, setLocalStorage] = localStorageHelper();
  useEffect(()=> {
    const fetchDropdowns = async () => {
      const genres = db.getDistinctGenres();
      const years = db.getDistinctYears();
      const tempos =  db.getDistinctTempos();

      
      const x  = await Promise.all([genres, years, tempos])
      dispatch({type: "SET_OPTIONS", payload: {key: "genre", options: x[0]}})
      dispatch({type: "SET_OPTIONS", payload: {key: "year", options: x[1]}})
      dispatch({type: "SET_OPTIONS", payload: {key: "tempo", options: x[2]}})
    }

    fetchDropdowns()
  }, [])




  const handleFormSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({type: "SYNC_VALUE"});
  }

  return (
    <div className=''>
        <form className='flex flex-wrap' onSubmit={handleFormSubmit}> 
        {
            Object.keys(search_fields).map((key)=> {

                const field = search_fields[key]
                const DynamicElement = componentMap[search_fields[key].as];
                if (!DynamicElement) return <div key={key}>ERRROORRRR</div>
                return (
                  
                    <div className="flex flex-column min-w-min flex-1 max-w-full p-1 mb-2" key={`field_${key}`}>
                        <label htmlFor="">{field.label}</label>
                        <DynamicElement
                          value={field.stage}
                          options={field.options}
                          onChange={
                            (e: unknown)=> {
                              setLocalStorage(key, e.target.value);
                              dispatch({type: "UPDATE_SEARCH_FIELD_STAGE", payload: {key, value: e.target.value }}) 
                            }
                          }>
                        </DynamicElement>
                    </div>
                )
            })
        }
        { <Button label='Search' className={`w-full mb-2`} onClick={() => dispatch({type: "SYNC_VALUE"})}></Button>  }
        { <Button label='Clear Fields' severity={'danger'} className={`w-full mb-2`} onClick={
          () => {
            Object.keys(search_fields).forEach(field => {
              setLocalStorage(field, typeof search_fields[field].stage === 'string' ? '' : []);
              dispatch({type: "UPDATE_SEARCH_FIELD_STAGE", payload: {key: field, value: typeof search_fields[field].stage === 'string' ? '' : []}});
              
            })
          }
          }></Button>  }
        </form>
    </div>
  )
}

export default SearchFields
