import  { useContext } from "react";
import { createContext } from "react";
import { SearchFieldType } from "../components/SearchFields/SearchFields";
export  type AppSearch = {
    search_fields: SearchFieldType[],
}

export const AppSearchContext = createContext<[AppSearch, React.Dispatch<AppSearchAction>] | null>(null)



export const useAppSearch = () => { 
    const appSearchContext = useContext(AppSearchContext)
    if (!appSearchContext) {
        throw new Error("useAppSearch must be declared within a provider");
    }
    return appSearchContext;
}



export type AppSearchAction = {
    type: "UPDATE_SEARCH_FIELD_VALUE" | "CLEAR_SEARCH_FIELD_VALUE";
    payload? : {
        key: string | number, 
        value: string | string[];
    }
}


export const initialState: AppSearch = {
    search_fields: [
        {
            key: "artist", 
            as: "InputText", 
            value: "", 
            label: "Artist", 
            disabled: false, 
        }, 
        {
            key: "title", 
            as: "InputText", 
            value: "", 
            label: "Title", 
            disabled: false
        }
    ]
}

export const reducer = (state: AppSearch, action: AppSearchAction) : AppSearch => {
    console.log("dsdfs", action);
    switch (action.type)  {
        case "UPDATE_SEARCH_FIELD_VALUE":
            return {
                ...state,
                search_fields: state.search_fields.map((x, i)=> {

                    if (action.payload) {
                        if (i==action.payload.key) return {...x, value: action.payload.value}

                    }
                    return { ...x}
               })
            }
        

        case "CLEAR_SEARCH_FIELD_VALUE": 
            return { 
                ...state, 
                search_fields: state.search_fields.map((x, i)=> {
                    if (action.payload?.key == i) return {...x, value: ""}
                    return {...x}
                })
            }
    }
}