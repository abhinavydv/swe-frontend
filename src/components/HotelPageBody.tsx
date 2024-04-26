import '../styles/HotelPageBody.css';
import SampleImage from '../assets/sampleHotel.jpeg';
import { RoomCard } from './RoomCard';
import { RoomAmenities } from './RoomAmenities';
import { Button } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { BookingSummary } from './BookingSummary';
import { HotelPageContext, HotelPageInterface, Room } from './HotelPage';
import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export interface BookingSummaryInterface {
    bill: number;
    selectedRooms: number[];
    setBill: (bill: number) => void;
    setSelectedRooms: (selectedRooms: number[]) => void;
}

export const BookingSummaryContext = createContext<Partial<BookingSummaryInterface>>({});

const HotelPageBody = () => {
    const { hotelInfo } = useContext(HotelPageContext) as HotelPageInterface;

    const [bill, setBill] = useState(0);
    const [selectedRooms, setSelectedRooms] = useState(Array(hotelInfo.available_rooms.length).fill(0));

    const navigate = useNavigate();

    const handleProceed = () => {
        axios.get("/users/logged").then((res) => {
            if(res.data.status == "Error") navigate('/customer/login');
        }, (err) => {
            console.log(err);
        })

        
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
            <BookingSummaryContext.Provider value={{ bill, selectedRooms, setBill, setSelectedRooms, }}>
                <div className='rooms-row'>
                    <div className='rooms'>
                        {hotelInfo.available_rooms.map((room, index) => (
                            <RoomCard key={index} roomAmenities={room.amenities} rate={room.price} roomType={room.room_type} capacity={room.max_occupancy} bedType={room.bed_type} maxAvailable={room.number_of_rooms} />
                        ))}
                    </div>
                    <div className='right-summary'>
                        <BookingSummary />
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