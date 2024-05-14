import React from 'react'
import { InputText } from 'primereact/inputtext'
import { useAppSearch } from '../../context/app-search'
import { MultiSelect } from 'primereact/multiselect'

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


  const changeMe = (e: React.FormEvent<HTMLInputElement>, callback: SearchFieldType["emmit"]) :void => {
    if (callback !== undefined) {
        callback(e)
    }
  }

  return (
    <div className='flex flex-wrap border-1'>

        {
            search_fields.map((field , index)=> {
                const DynamicElement = componentMap[field.as];
                return (
                    <div className="flex flex-column min-w-min border-1 flex-1 max-w-full p-1 mb-2" key={`field_${field.key}`}>
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
