import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import SearchResults from './SearchResults'
import LoginCustomer from './LoginCustomer'
import RegisterCustomer from './RegisterCustomer'
import LoginPartner from './LoginPartner'
import RegisterPartner from './RegisterPartner'
import { createContext, useState } from 'react'
import HotelPage from './HotelPage';
import { PartnerHome } from './partner/PartnerHome'
import { Box } from '@mui/material'
import { DateRange } from 'rsuite/esm/DateRangePicker'


interface UserDataInterface {
  isLoggedIn: boolean;
  name: string;
  email: string;
  role: "customer" | "partner";
}

export interface AppContextInterface {
  user: UserDataInterface;
  searchBar: boolean;
  dateRangeValue: [Date, Date],
  setUser: (user: UserDataInterface) => void;
  setSearchBar: (searchBar: boolean) => void;
  setDateRangeValue: (startDate: [Date, Date]) => void;
}

export const AppContext = createContext<Partial<AppContextInterface>>({});

function App() {
  const [user, setUser] = useState<UserDataInterface>({isLoggedIn: true, name: "Abhinav", email: "ab@iith-ac.in", role: "partner"});
  const [searchBar, setSearchBar] = useState<boolean>(false);
  const [dateRangeValue, setDateRangeValue] = useState<[Date, Date]>();

  return (
    <AppContext.Provider value={{ user, searchBar, dateRangeValue, setUser, setSearchBar, setDateRangeValue, }} >
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/search' element={<SearchResults />}/>
          <Route path='partner-login' element={<LoginPartner />} />
          <Route path='partner-register' element={<RegisterPartner />}/>
          <Route path='customer-login' element={<LoginCustomer />}/>
          <Route path='customer-register' element={<RegisterCustomer />}/>
          <Route path='hotel-page' element={<HotelPage />} />
          <Route path='hotel-page' element={<HotelPage />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App;