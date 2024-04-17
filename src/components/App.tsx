import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import SearchResults from './SearchResults'
import LoginCustomer from './LoginCustomer'
import RegisterCustomer from './RegisterCustomer'
import LoginPartner from './LoginPartner'
import RegisterPartner from './RegisterPartner'
import ProfilePage from './common/ProfilePage'
import { Footer } from './Footer'
import { Box } from '@mui/material'
import { PartnerHome } from './partner/PartnerHome'
import { createContext, useState } from 'react'
import HotelPage from './HotelPage';
import axios from 'axios'


axios.defaults.withCredentials = true;

export interface UserDataInterface {
    isLoggedIn: boolean;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    address: string;
    gender: string;
    dob: string;
    nationality: string;
    profile_picture: string;
    role: "customer" | "partner";
}

export interface AppContextInterface {
    user: UserDataInterface;
    searchBar: boolean;
    setUser: (user: UserDataInterface) => void;
    setSearchBar: (searchBar: boolean) => void;
}

export const AppContext = createContext<Partial<AppContextInterface>>({});

function App() {
    const [user, setUser] = useState<UserDataInterface>({
        isLoggedIn: true,
        first_name: "Abhinav",
        last_name: "Yadav",
        phone: "1234567890",
        email: "ab@iith-ac.in", 
        address: "IIT Hyderabad",
        gender: "Attack Helicopter",
        dob: "03-05-2000",
        nationality: "India",
        profile_picture: "https://oshiprint.in/image/cache/catalog/poster/new/mqp1380-1100x1100h.jpeg.webp",
        role: "partner",
    });
    const [searchBar, setSearchBar] = useState<boolean>(false);

    return (
        <AppContext.Provider value={{ user, searchBar, setUser, setSearchBar }} >
            <Box minHeight="100vh" sx={{display: "flex", flexDirection: "column"}}>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home />}/>
                        <Route path='/search' element={<SearchResults />}/>
                        <Route path='/partner' element={<PartnerHome />} />
                        <Route path='/partner/login' element={<LoginPartner />} />
                        <Route path='/partner/register' element={<RegisterPartner />}/>
                        <Route path='/customer/login' element={<LoginCustomer />}/>
                        <Route path='/customer/register' element={<RegisterCustomer />}/>
                        <Route path='/hotel-page' element={<HotelPage />} />
                        <Route path='/profile' element={<ProfilePage />} />
                    </Routes>
                    <Box sx={{marginTop: "auto"}}>
                        <Footer/>
                    </Box>
                </Router>
            </Box>
        </AppContext.Provider>
    )
}

export default App;