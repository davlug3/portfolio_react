import React from 'react'
import { InputText } from 'primereact/inputtext'

export type SearchFieldType = {
    key: string, 
    label: string,
    value: string, 
    disabled: boolean, 
    as : string,
    emmit?: (e: React.FormEvent<HTMLInputElement>)=> void, 
}

const componentMap : Record<string, React.ComponentType<any>> = {
    InputText : InputText
}
function SearchFields() {
  const fields : SearchFieldType[] | [] = [
    {
        key: "My", 
        as: "InputText", 
        label: "My Label", 
        value: "My Value", 
        disabled: false, 
        emmit: (e) => {
            console.log("setter", e.target?.value)
        }
    }
  ]


  const changeMe = (e: React.FormEvent<HTMLInputElement>, callback: SearchFieldType["emmit"]) :void => {
    if (callback !== undefined) {
        callback(e)
    }
  }

  return (
    <div>
      <p>Search Fields</p>

        {
            fields.map(field => {
                const DynamicElement = componentMap[field.as];
                return (
                    <div key={`field_${field.key}`}>
                        <label htmlFor="">{field.label}</label>
                        <DynamicElement value={field.value} onChange={(e: React.FormEvent<HTMLInputElement>) => changeMe(e, field.emmit, )}></DynamicElement>
                    </div>
                )
            })
        }

    </div>
  )
}

export default SearchFields
