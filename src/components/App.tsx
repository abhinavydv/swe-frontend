import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import SearchResults from './SearchResults'
import LoginCustomer from './LoginCustomer'
import RegisterCustomer from './RegisterCustomer'
import LoginPartner from './LoginPartner'
import RegisterPartner from './RegisterPartner'

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
          <Route path='partner-login' element={<LoginPartner />} />
          <Route path='partner-register' element={<RegisterPartner />}/>
          <Route path='customer-login' element={<LoginCustomer />}/>
          <Route path='customer-register' element={<RegisterCustomer />}/>
          <Route path='hotel-page' element={<HotelPage />} />
        </Routes>
      </Router>

    </AppContext.Provider>
  )
}

export default App;