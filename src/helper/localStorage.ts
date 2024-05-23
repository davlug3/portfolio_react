import { SearchFieldOptionType } from "../components/SearchFields/SearchFields";

export const localStorageHelper = () : [(key:string) => SearchFieldOptionType[] | string | null, (key: string, value: SearchFieldOptionType[] | string) => void] => {
    console.log("localStorageHelper");
    const getItem = (key: string): SearchFieldOptionType[] | string | null=> {
        try {
            const item  = localStorage.getItem(key);
            if (item===null) return null;
            return JSON.parse(item)
        }
        catch (error) {
            // console.error("Invalid value in localstorage", key, error);
            return localStorage.getItem(key)
            return null
        }
    };


    const setItem = (key: string, value: SearchFieldOptionType[] | string )=> {

        if (typeof value === 'string') {
            localStorage.setItem(key, value);
            return 
        }
        localStorage.setItem(key, JSON.stringify(value as SearchFieldOptionType[]));
        return 
    };


    return [getItem, setItem]
}