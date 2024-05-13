import React from 'react'
import { InputText } from 'primereact/inputtext'
import { useAppSearch } from '../../context/app-search'

export type SearchFieldType = {
    key: string, 
    label: string,
    value: string | string[], 
    disabled: boolean, 
    as : string,
    emmit?: (e: React.FormEvent<HTMLInputElement>)=> void, 
}

const componentMap : Record<string, React.ComponentType<any>> = {
    InputText : InputText
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
    <div>
      <p>Search Fields</p>

        {
            search_fields.map((field , index)=> {
                const DynamicElement = componentMap[field.as];
                return (
                    <div className="flex flex-column" key={`field_${field.key}`}>
                        <label htmlFor="">{field.label}</label>
                        <DynamicElement
                          value={field.value}
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
