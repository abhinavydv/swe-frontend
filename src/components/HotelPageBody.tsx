import '../styles/HotelPageBody.css';
import SampleImage from '../assets/sampleHotel.jpeg';
import { RoomCard } from './RoomCard';
import { RoomAmenities } from './RoomAmenities';
import { Button } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { BookingSummary } from './BookingSummary';
import { HotelPageContext, HotelPageInterface } from './HotelPage';
import { useContext } from 'react';

const HotelPageBody = () => {
    const { hotelInfo } = useContext(HotelPageContext) as HotelPageInterface;
    console.log('hotelInfo', hotelInfo);

    return (
        <div className='page'>
            <h1 className='heading'>Aalia Villas Anjuna, Goa by Aalia Collection Opens</h1>
            <div className='horizontal-bar'></div>
            <div className='imagesRow'>
                {hotelInfo?.images?.map((image, index) => (
                    <div className='image-container'>
                        <img src={image} className='image' key={index} onClick={() => window.open(image, '_blank')} />
                    </div>
                ))}
            </div>
            <div className='horizontal-bar'></div>
            <div className='row'>
                <RoomAmenities />
                <div className='description'>{hotelInfo?.description}</div>
            </div>
            <div className='rooms-heading'>
                Choose your rooms
            </div>
            <div className='rooms-row'>
                <div className='rooms'>
                    <RoomCard roomType='Standard' capacity={2} bedType='Single' maxAvailable={4} />
                    <RoomCard roomType='Executive' capacity={3} bedType='Queen' maxAvailable={4} />
                    <RoomCard roomType='Suite' capacity={3} bedType='Queen' maxAvailable={4} />
                    <RoomCard roomType='Executive Suite' capacity={4} bedType='King' maxAvailable={4} />
                </div>
                <div className='right-summary'>
                    <BookingSummary selectedRooms={[
                        {
                            roomType: 'Standard',
                            capacity: 2,
                            rate: 2000,
                            numSelected: 1
                        },
                        {
                            roomType: 'Suite',
                            capacity: 3,
                            rate: 3000,
                            numSelected: 2
                        }
                    ]} duration={[
                        new Date('2022-11-01'),
                        new Date('2022-11-03')
                    ]} />
                    <div className='proceed'>
                        <div className='hori-spacer'></div>
                        <Button variant='contained' sx={{
                            textTransform: 'none',
                            fontSize: '1rem'
                        }} endIcon={<ChevronRight />}>
                            Proceed with booking
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HotelPageBody;