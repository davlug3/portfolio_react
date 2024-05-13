import React , {useReducer} from 'react'
import { AppSearchContext } from './app-search'
import { reducer , initialState} from './app-search';

function AppSearchContextProvider({children}: { children: React.ReactNode}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppSearchContext.Provider value={[state, dispatch]}>{children}</AppSearchContext.Provider>
  )
}

export default AppSearchContextProvider
