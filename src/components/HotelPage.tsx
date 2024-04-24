import { createContext, useContext, useEffect, useState } from "react"
import Navbar from "./Navbar"
import { AppContext, AppContextInterface } from "./App"
import HotelPageBody from "./HotelPageBody";
import axios from "axios";
import { Hotel } from "@mui/icons-material";

export type RoomAmenity = {
    name: string;
    type: 'good' | 'bad';
}

export type Room = {
    type: string;
    bed: string;
    maxOccupancy: number;
    amenities: RoomAmenity[];
    maxAvailable: number;
    rate: number;
}

export type HotelInfo = {
    hotel_name: string;
    amenities: number;
    images: string[];
    description: string;
    rooms: Room[];
}

export interface HotelPageInterface {
    hotelInfo: HotelInfo;
    setHotelInfo: (hotelInfo: HotelInfo) => void;
}

export const HotelPageContext = createContext<Partial<HotelPageInterface>>({});

const HotelPage = () => {
    const { setSearchBar } = useContext(AppContext) as AppContextInterface;

    const [hotelInfo, setHotelInfo] = useState<HotelInfo>();

    useEffect(() => {
        setSearchBar(false);
        

        // const hotel_id = window.location.pathname.split('?')[1]?.split('&')[0]?.split('=')[1];
        // const check_in_date = window.location.pathname.split('?')[1]?.split('&')[1]?.split('=')[1]?.split('__')[0];
        // const check_out_date = window.location.pathname.split('?')[1]?.split('&')[1]?.split('=')[1]?.split('__')[1];
        const urlParams = new URLSearchParams(window.location.search);
        const hotel_id = urlParams.get('hotel_id');
        const dateRange = urlParams.get('dates');
        
        if (!hotel_id || !dateRange) {
            console.error('Missing or malformed URL parameters');
            return;
        }

        const [check_in_date, check_out_date] = dateRange.split('__');

        axios.post('/search/get_hotel_page',{
            hotel_id: parseInt(hotel_id), 
            date_range: {
                start_date: check_in_date, 
                end_date: check_out_date,
            },}).then((res) => {
            console.log('data',res.data);

            if(res.data.status === "OK") {
                setHotelInfo(res.data.hotel_page)
            }
        }, (err) => {
            console.log(hotel_id)
            console.log(check_in_date)
            console.log(err);
        });
    },[])

    return (
        <HotelPageContext.Provider value={{ hotelInfo, setHotelInfo }}>
            <div>
                <Navbar enteredDates={null} enteredQuery={null}/>
                <HotelPageBody />
            </div>
        </HotelPageContext.Provider>
    )
}

export default HotelPage;