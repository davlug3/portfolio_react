type LS_ACTION_GET = {
    action: "GET", 
    payload: string
}

type LS_ACTION_SET = {
    action: "SET", 
    payload: {
        key: string, value : unknown
    }
}


export const useLocalStorage = (params : LS_ACTION_GET | LS_ACTION_SET) => {
    switch (params.action) {
        case "GET": 
            return localStorage.getItem(params.payload)  == null ? null : JSON.parse(localStorage.getItem(params.payload) as string)
        case "SET": 
            return localStorage.setItem(params.payload.key, JSON.stringify(params.payload.value))
    }
}