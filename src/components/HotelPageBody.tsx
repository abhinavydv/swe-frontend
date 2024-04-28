import '../styles/HotelPageBody.css';
import { RoomCard } from './RoomCard';
import { RoomAmenities } from './RoomAmenities';
import { Button } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { BookingSummary } from './BookingSummary';
import { HotelPageContext, HotelPageInterface } from './HotelPage';
import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext, AppContextInterface } from './App';

export interface BookingSummaryInterface {
    bill: number;
    selectedRooms: number[];
    setBill: (bill: number) => void;
    setSelectedRooms: (selectedRooms: number[]) => void;
    setMaxGuests: (maxGuests: number) => void;
}

export const BookingSummaryContext = createContext<Partial<BookingSummaryInterface>>({});

const HotelPageBody = () => {
    const { user, dateRange, setBookingSummary } = useContext(AppContext) as AppContextInterface;
    const { hotelInfo, hotelID } = useContext(HotelPageContext) as HotelPageInterface;

    const [bill, setBill] = useState(0);
    const [maxGuests, setMaxGuests] = useState(0);
    const [selectedRooms, setSelectedRooms] = useState(Array(hotelInfo.available_rooms.length).fill(0));

    const navigate = useNavigate();

    const handleProceed = () => {
        axios.get("/users/logged").then((res) => {
            if(res.data.status == "Error") navigate('/customer/login');
        }, (err) => {
            console.log(err);
        })

        setBookingSummary({
            user: user,
            bill: bill,
            hotelID: hotelID,
            selectedRooms: selectedRooms,
            dateRange: dateRange
        })
        console.log("hotelInfo", selectedRooms)
        navigate(`/customer/booking/add_guests?maxGuests=${maxGuests}`,{
            state: {
                bill: bill,
                selectedRooms: selectedRooms,
                hotelInfo: hotelInfo,
                dateRange: dateRange,
                hotelID: hotelID,
            }
        });
    }

    return (
        <div className='page'>
            <h1 className='heading'>{hotelInfo.hotel_name}</h1>
            <div className='horizontal-bar'></div>
            <div className='imagesRow'>
                {hotelInfo.photos.map((image, index) => (
                    <div className='image-container' key={index}>
                        <img src={image} className='image' onClick={() => window.open(image, '_blank')} />
                    </div>
                ))}
            </div>
            <div className='horizontal-bar'></div>
            <div className='hotel-page-row'>
                <RoomAmenities />
                <div className='hotel-description'>{hotelInfo.description}</div>
            </div>
            <div className='rooms-heading'>
                Choose your rooms
            </div>
            <BookingSummaryContext.Provider value={{ bill, selectedRooms, setBill, setSelectedRooms, setMaxGuests }}>
                <div className='rooms-row'>
                    <div className='rooms'>
                        {hotelInfo.available_rooms.map((room, index) => 
                            {console.log(room.room_amenities);
                             return (<RoomCard key={index} roomAmenities={room.room_amenities} rate={room.price} roomType={room.room_type} capacity={room.max_occupancy} bedType={room.bed_type} maxAvailable={room.total_rooms} maxGuests={maxGuests} setMaxGuests={setMaxGuests} />)}
                        )}
                    </div>
                    <div className='right-summary'>
                        <BookingSummary bill={bill} selectedRooms={selectedRooms} hotelInfo={hotelInfo} dateRange={dateRange} />
                        <div className='proceed'>
                            <div className='hori-spacer'></div>
                            <Button variant='contained' sx={{
                                textTransform: 'none',
                                fontSize: '1rem'
                            }} endIcon={<ChevronRight />} disabled={bill == 0} onClick={handleProceed} >
                                Proceed with booking
                            </Button>
                        </div>
                    </div>
                </div>
            </BookingSummaryContext.Provider>
        </div>
    );
}

export default HotelPageBody;