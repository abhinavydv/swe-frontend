import '../styles/HotelPageBody.css';
import SampleImage from '../assets/sampleHotel.jpeg';
import { RoomCard } from './RoomCard';
import { RoomAmenities } from './RoomAmenities';
import { DateRangePicker } from 'rsuite';
import { useContext } from 'react';
import { AppContext, AppContextInterface } from './App';
import { Button } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';

const HotelPageBody = () => {
    // const { dateRangeValue, setDateRangeValue } = useContext(AppContext) as AppContextInterface;

    const images = [SampleImage, SampleImage, SampleImage, SampleImage, SampleImage, SampleImage, SampleImage, SampleImage]
    const description = "Featuring a fitness center, bar and views of lake, ITC Kohenur, a Luxury Collection Hotel, Hyderabad is located in Hyderabad, 4.3 mi from ISB. Boasting a 24-hour front desk, this property also welcomes guests with restaurants and an outdoor pool. The accommodations features room service, a concierge service and currency exchange for guests.\n\nThe rooms at the hotel have air conditioning, a flat-screen TV with cable channels, and a private bathroom with a bath, a hairdryer and free toiletries. The units will provide guests with a desk and a kettle. Cribs are available at the property on request on a complimentary basis.\n\n ITC Kohenur, a Luxury Collection Hotel, Hyderabad offers buffet breakfast.\n\nThe property is 1969 feet from Knowledge City, 1.2 mi from Raheja Mindspace, 6.8 mi from KBR Park, 2.5 mi from DLF Cyber City and Divyashree Orion, 2.2 mi from Boulder Hills Golf Course and 3.7 mi from Hyderabad International Convention Center. Golkonda Fort is 5.6 mi from ITC Kohenur, a Luxury Collection Hotel, Hyderabad, while Banjara Hills is 6.2 mi from the property. The nearest airport is Rajiv Gandhi International, 22 mi from the hotel, and the property offers a paid airport shuttle service.\n\nFeaturing a fitness center, bar and views of lake, ITC Kohenur, a Luxury Collection Hotel, Hyderabad is located in Hyderabad, 4.3 mi from ISB. Boasting a 24-hour front desk, this property also welcomes guests with restaurants and an outdoor pool. The accommodations features room service, a concierge service and currency exchange for guests.\n\nThe rooms at the hotel have air conditioning, a flat-screen TV with cable channels, and a private bathroom with a bath, a hairdryer and free toiletries. The units will provide guests with a desk and a kettle. Cribs are available at the property on request on a complimentary"

    return (
        <div className='page'>
            <h1 className='heading'>Aalia Villas Anjuna, Goa by Aalia Collection Opens</h1>
            <div className='horizontal-bar'></div>
            <div className='imagesRow'>
                {images.map((image, index) => (
                    <div className='image-container'>
                        <img src={image} className='image' key={index} onClick={() => window.open(image, '_blank')} />
                    </div>
                ))}
            </div>
            <div className='horizontal-bar'></div>
            <div className='row'>
                <RoomAmenities />
                <div className='description'>{description}</div>
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
                <div className='change-dates'>
                    <DateRangePicker onChange={(value) => {console.log(value);}} />
                </div>
            </div>
            <div className='proceed'>
                <Button variant='contained' sx={{
                    textTransform: 'none',
                    fontSize: '1rem'
                }} endIcon={<ChevronRight />}>
                    Proceed with booking
                </Button>
            </div>
        </div>
    );
}

export default HotelPageBody;