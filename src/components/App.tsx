import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import SearchResults from './SearchResults'
import { createContext, useState } from 'react'

export const AppContext = createContext({})

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  return (
    <AppContext.Provider value={{isLoggedIn,searchBar,setIsLoggedIn,setSearchBar}} >
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/search' element={<SearchResults />}/>
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App;