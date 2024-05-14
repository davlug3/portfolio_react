import React, { useReducer } from 'react'
import { DataContext  } from './data'
import { reducer, initialState } from './data'

function DataContextProvider({children}: {children: React.ReactElement}) {
    const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <DataContext.Provider value={[state, dispatch]}>
        {children}
    </DataContext.Provider>
  )
}

export default DataContextProvider
