import { createContext, useContext, useEffect, useState } from "react"
import Navbar from "./Navbar"
import { AppContext, AppContextInterface } from "./App"
import HotelPageBody from "./HotelPageBody";
import axios from "axios";
import { axiosHeader } from "./SearchResults";

export type RoomAmenity = {
    name: string;
    quality: 'good' | 'bad';
}

export type Room = {
    room_type: number;
    bed_type: string;
    max_occupancy: number;
    amenities: RoomAmenity[];
    number_of_rooms: number;
    price: number;
}

export type HotelInfo = {
    hotel_name: string;
    amenities: number;
    photos: string[];
    description: string;
    available_rooms: Room[];
}

export interface HotelPageInterface {
    hotelInfo: HotelInfo;
    setHotelInfo: (hotelInfo: HotelInfo) => void;
}

export const HotelPageContext = createContext<Partial<HotelPageInterface>>({});

const HotelPage = () => {
    const { setSearchBar } = useContext(AppContext) as AppContextInterface;

    const [hotelInfo, setHotelInfo] = useState<HotelInfo>({
        hotel_name: 'Aalia Villas Anjuna, Goa by Aalia Collection Opens',
        amenities: 55,
        photos: [
            'https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg',
            'https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg',
            'https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg',
            'https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg',
            'https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg',
            'https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg',
            'https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg',
        ],
        description: 'AaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAaliaAalia',
        available_rooms: [
            {
                room_type: 0,
                bed_type: 'Single',
                max_occupancy: 2,
                amenities: [
                    {
                        name: 'Free Cancellation',
                        quality: 'good'
                    },
                    {
                        name: 'Complimentary Breakfast',
                        quality: 'good'
                    },
                    {
                        name: 'Extra charges applicable for lunch and dinner',
                        quality: 'bad'
                    }
                ],
                number_of_rooms: 4,
                price: 4000
            },
            {
                room_type: 1,
                bed_type: 'Queen',
                max_occupancy: 3,
                amenities: [
                    {
                        name: 'Free Cancellation',
                        quality: 'good'
                    },
                    {
                        name: 'Complimentary Breakfast',
                        quality: 'good'
                    },
                    {
                        name: 'Extra charges applicable for lunch and dinner',
                        quality: 'bad'
                    }
                ],
                number_of_rooms: 4,
                price: 6000
            },
            {
                room_type: 2,
                bed_type: 'Queen',
                max_occupancy: 3,
                amenities: [
                    {
                        name: 'Free Cancellation',
                        quality: 'good'
                    },
                    {
                        name: 'Complimentary Breakfast',
                        quality: 'good'
                    },
                    {
                        name: 'Extra charges applicable for lunch and dinner',
                        quality: 'bad'
                    }
                ],
                number_of_rooms: 4,
                price: 9000
            },
            {
                room_type: 3,
                bed_type: 'King',
                max_occupancy: 4,
                amenities: [
                    {
                        name: 'Free Cancellation',
                        quality: 'good'
                    },
                    {
                        name: 'Complimentary Breakfast',
                        quality: 'good'
                    },
                    {
                        name: 'Extra charges applicable for lunch and dinner',
                        quality: 'bad'
                    }
                ],
                number_of_rooms: 4,
                price: 11000
            }
        ]
    });

    useEffect(() => {
        setSearchBar(false);
    
        const urlParams = new URLSearchParams(window.location.search);
        const hotel_id = urlParams.get('hotel_id');
        const _dateRange = urlParams.get('dates');
        
        if (!hotel_id || !_dateRange) {
            console.error('Missing or malformed URL parameters');
            return;
        }

        const [check_in_date, check_out_date] = _dateRange.split('__');
        const data = {
            hotel_id: parseInt(hotel_id), 
            date_range: {
                start_date: check_in_date, 
                end_date: check_out_date
            }
        };

        axios.post('/search/get_hotel_page',data,{
            headers: axiosHeader
        }).then((res) => {
            console.log('data',res.data);

            if(res.data.status === "OK") {
                setHotelInfo(res.data.hotel_page)
                console.log("Hotel data is set now");
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