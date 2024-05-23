import  { act, useContext } from "react";
import { createContext } from "react";
import { SearchFieldOptionType, SearchFieldType } from "../components/SearchFields/SearchFields";
export  type AppSearch = {
    search_fields: Record<string,SearchFieldType>
}

export const AppSearchContext = createContext<[AppSearch, React.Dispatch<AppSearchAction>] | null>(null)



export const useAppSearch = () => { 
    const appSearchContext = useContext(AppSearchContext)
    if (!appSearchContext) {
        throw new Error("useAppSearch must be declared within a provider");
    }
    return appSearchContext;
}





////////////////
type AppSearchAction_Update_Search_Field_Stage = {
    type: "UPDATE_SEARCH_FIELD_STAGE", 
    payload: {
        key: string, 
        value: string | string[] | null
    }
}

type AppSearchAction_Clear_Search_Field_Stage = {
    type: "CLEAR_SEARCH_FIELD_STAGE",
    payload: {
        key: string
    }
}

type AppSearchAction_Set_Options = {
    type: "SET_OPTIONS", 
    payload: {
        key: string,
        options: SearchFieldOptionType[], 
    }
}

type AppSearchAction_Sync_Value = {
    type: "SYNC_VALUE", 
    payload?: {
        key: string,
    }
}


export type AppSearchAction = 
   AppSearchAction_Update_Search_Field_Stage |  
   AppSearchAction_Clear_Search_Field_Stage | 
   AppSearchAction_Set_Options | 
   AppSearchAction_Sync_Value;



export const initialState: AppSearch = {
    search_fields:{
      artist: {
            order: 0, 
            as: "InputText", 
            value: "", 
            stage: "",
            label: "Artist", 
            disabled: false, 
      }, 
      title: {
            order: 1,
            as: "InputText", 
            value: "", 
            stage: "",
            label: "Title", 
            disabled: false
      },
      year: {
            order: 2, 
            as: "MultiSelect", 
            value: [], 
            stage: [], 
            label: "Year", 
            options: [], 
            disabled: false
 
      },
      tempo: {
            order: 3,
            as: "MultiSelect", 
            value: [], 
            stage: [], 
            label: "Tempo", 
            options: [{
                key: "slow", 
                label: "Slow", 
                disabled: false,
            }], 
            disabled: false
 
      },
      genre: {
            order: 4,
            as: "MultiSelect", 
            value: [], 
            stage: [], 
            label: "Genre", 
            disabled: false
      }

    } 
        
      
   
}

// export const reducer = (state: AppSearch, action: AppSearchAction) : AppSearch => {
//     console.log("dsdfs", action);
//     switch (action.type)  {
//         case "UPDATE_SEARCH_FIELD_STAGE":
//             return {
//                 ...state,
//                 search_fields: state.search_fields.map((x, i)=> {

//                     if (action.payload && action.payload?.value) {
//                         if (i==action.payload.key) return {...x, stage: action.payload.value}

//                     }

//                     return { ...x}
//                })
//             }
        

//         case "CLEAR_SEARCH_FIELD_STAGE": 
//             return { 
//                 ...state, 
//                 search_fields: state.search_fields.map((x, i)=> {
//                     if (action.payload?.key == i) 
//                         return {...x, stage: ""}
//                     return {...x}
//                 })
//             }
        
//         case "SET_OPTIONS":
//             return {
//                 ...state, 
//                 search_fields: state.search_fields.map((x, i)=> {
//                     const options : SearchFieldOptionType[] | null = [];
                    
//                     if (Array.isArray(action.payload?.options)) {
//                         action.payload?.options.forEach(y=> {
//                             options.push(y)
//                         })
//                     }
//                     console.log("options: ", options,  i);
//                     console.log("action.payload?.key : ", action.payload?.key );

//                     if (action.payload?.key == i) 
//                         return { ...x, options }
//                     return { ...x}
//                 })
//             }

//         case "SYNC_VALUE":
//             return {
//                 ...state, 
//                 search_fields: state.search_fields.map((x, i)=> {
//                     if (action.payload) {
//                         if (action.payload.key == i) 
//                             return {
//                                     ...x, value: x.stage
//                                 }
//                         return { ...x }
    
//                     }
//                     else {
//                         return { ...x, value: x.stage }
//                     }
//               })
//             }

//     }
// }



export const reducer = (state: AppSearch, action: AppSearchAction) : AppSearch => {
console.log();action.payload
    switch (action.type) {
        case "UPDATE_SEARCH_FIELD_STAGE": 
            return {
                ...state,
                search_fields: {
                    ...state.search_fields,
                    [action.payload.key] : {
                        ...state.search_fields[action.payload.key],
                        stage: action.payload.value !== null ? action.payload.value : [''] 
                    }
                }
            };

        case "CLEAR_SEARCH_FIELD_STAGE":
            return {
                ...state, 
                search_fields: {
                    ...state.search_fields,
                    [action.payload.key]: {
                        ...state.search_fields[action.payload.key],
                        stage: ['']
                    }
                }
            };
        case "SET_OPTIONS":
            return {
                ...state, 
                search_fields: {
                    ...state.search_fields,
                    [action.payload.key] : {
                        ...state.search_fields[action.payload.key] ,
                        options: [...action.payload.options]
                    }
                }
            };

        /// here payload is optional, so add some code here to facilitate optional payload
        case "SYNC_VALUE":
            return {
                ...state,
                search_fields: Object.fromEntries(
                Object.entries(state.search_fields).map(([key, field]) => [
                    key,
                    { 
                        ...field,
                        value: state.search_fields[key].stage
                    }
                ])
                )
            };
    }
}