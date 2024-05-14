import React, { useContext } from "react";
import { createContext } from "react";


export type Song = {
    Id: number, 
    Artist: string,
    title: string, 
    genre: string,
    year: string | number, 
    tempo: string, 
    count: number, 
    christmas: boolean,
    opm: boolean
}
export type AppData = {
    data : Song[] | [],

}

export type AppDataAction = {
    type: "ADD_SONGS" | "ADD_SONG",//A
    payload?: {
        songs: Song[]
    }
}

export const initialState: AppData = {
   data: []
}

export const reducer = (state : AppData, action: AppDataAction) : AppData => {
    switch(action.type) {
        case "ADD_SONGS":
            if (Array.isArray(action.payload?.songs)) {
                return {
                    ...state,
                    data: action.payload.songs
                }
            }
         
            return { ...state }

        case "ADD_SONG" :
            if (Array.isArray(action.payload?.songs)) {
                return {
                    ...state, 
                    data: [...state.data, ...action.payload.songs]
                }
            }
            return {...state}

    }
}










export const DataContext = createContext<[AppData, React.Dispatch<AppDataAction>,] | null>(null)

export const useData = () => {
    const dataContext = useContext(DataContext)
    if (!dataContext) {
        throw new Error("dataContext must be wrapped in a service provider")
    }
    return dataContext
}