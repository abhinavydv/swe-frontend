import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import SearchResults from './SearchResults'
import Login from './Login'
import Register from './Register'

import { createContext, useState } from 'react'
import HotelPage from './HotelPage';

export interface AppContextInterface {
  isLoggedIn: boolean;
  searchBar: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setSearchBar: (searchBar: boolean) => void;
}

export const AppContext = createContext<Partial<AppContextInterface>>({});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchBar, setSearchBar] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ isLoggedIn, searchBar, setIsLoggedIn, setSearchBar }} >
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/search' element={<SearchResults />}/>
<<<<<<< Updated upstream
        <Route path='/login' element={<Login  />}/>
        <Route path='/register' element={<Register  />}/>
      </Routes>
    </Router>
=======
          <Route path='hotel-page' element={<HotelPage />} />
        </Routes>
      </Router>
>>>>>>> Stashed changes
    </AppContext.Provider>
  )
}

export default App;