import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
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
import { createContext, useEffect, useState } from 'react'
import HotelPage from './HotelPage';
import axios from 'axios'
import { Wishlist } from './Wishlist'
import { PastBookings } from './PastBookings'


axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = "http://127.0.0.1:8000";

export interface UserDataInterface {
    isLoggedIn: boolean;
    first_name?: string;
    last_name?: string;
    phone?: string;
    email?: string;
    address?: string;
    gender?: string;
    dob?: string;
    nationality?: string;
    profile_picture?: string;
    role?: "customer" | "partner";
}

export interface AppContextInterface {
    user: UserDataInterface;
    searchBar: boolean;
    mounted: boolean;
    dateRange: Date[];
    priceRange: number[];
    maxLowestPrice: number;
    setUser: (user: UserDataInterface) => void;
    setSearchBar: (searchBar: boolean) => void;
    setDateRange: (dateRange: Date[]) => void;
    setPriceRange: (priceRange: number[]) => void;
    setMaxLowestPrice: (maxLowestPrice: number) => void;
}

type QueryResults = {
    status: string;
    message: string;
    alert: boolean;
    user?: UserDataInterface;
}

export const AppContext = createContext<Partial<AppContextInterface>>({});

function App() {
    const [user, setUser] = useState<UserDataInterface>({
        isLoggedIn: false,
        first_name: "Abhinav",
        last_name: "Yadav",
        phone: "1234567890",
        email: "ab@iith-ac.in", 
        address: "IIT Hyderabad",
        gender: "Attack Helicopter",
        dob: "03-05-2000",
        nationality: "India",
        profile_picture: "https://oshiprint.in/image/cache/catalog/poster/new/mqp1380-1100x1100h.jpeg.webp",
        role: "customer",
    });
    const [searchBar, setSearchBar] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const [dateRange, setDateRange] = useState<Date[]>([]);
    const [priceRange, setPriceRange] = useState<number[]>([0,Infinity]);
    const [maxLowestPrice, setMaxLowestPrice] = useState<number>(0);

    useEffect(() => {
        axios.get("/users/logged").then((res) => {
            console.log("data", res.data);
            if (res.data.status === "OK")
                {setUser({
                    isLoggedIn: true,
                    first_name: res.data.user.first_name,
                    last_name: res.data.user.last_name,
                    phone: res.data.user.phone_number,
                    email: res.data.user.email_id,
                    address: res.data.user.address,
                    gender: res.data.user.gender,
                    dob: res.data.user.dob,
                    profile_picture: res.data.user.profile_image_path,
                    role: res.data.user.role,
                    nationality: res.data.user.nationality
                } as UserDataInterface)}
            setMounted(true);
            console.log("user", user);
        }, (err) => {
            console.log("error", err);
        });
    }, [])

    return (
        <AppContext.Provider value={{ user, searchBar, mounted, dateRange, priceRange, maxLowestPrice ,setUser, setSearchBar, setDateRange, setPriceRange, setMaxLowestPrice }} >
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
                        <Route path='/hotels' element={<HotelPage />} />
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='/user/wishlist' element={<Wishlist />} />
                        <Route path='/user/past_bookings' element={<PastBookings />} />
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