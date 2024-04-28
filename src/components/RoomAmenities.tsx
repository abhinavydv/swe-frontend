import Beach from '../assets/beach.png';
import Wifi from '../assets/wifi.png';
import Gym from '../assets/gym.png';
import Parking from '../assets/parking.png';
import BeachVolleyball from '../assets/beach-volleyball.png';
import Breakfast from '../assets/breakfast.png';
import CabServices from '../assets/cab.png';
import Kitchen from '../assets/kitchen.png';
import SwimmingPool from '../assets/swimming-pool.png';
import '../styles/RoomAmenities.css';
import { amenityCheckInterface } from './SearchResults';
import { useContext, useState } from 'react';
import { HotelPageContext, HotelPageInterface } from './HotelPage';

interface AmenityProps {
    amenityName: string;
}

interface IconMapInterface {
    [key: string]: string;
}

const amenityIconMap: IconMapInterface = {
    'Beach Access': Beach,
    'Wifi': Wifi,
    'Gym': Gym,
    'Parking': Parking,
    'Beach Volleyball': BeachVolleyball,
    'Breakfast': Breakfast,
    'Cab services': CabServices,
    'Kitchen': Kitchen,
    'Swimming Pool': SwimmingPool,
}

const Amenity: React.FC<AmenityProps> = ({ amenityName }) => {
    return (
        <div className='amenity'>
            <img src={amenityIconMap[amenityName]} className='amenity-icon'/>
            <p className='name'>{amenityName}</p>
        </div>
    )
}

export const RoomAmenities = () => {
    // const { amenities } = useContext(SearchResultsContext) as SearchResultsInterface;
    const { hotelInfo } = useContext(HotelPageContext) as HotelPageInterface;

    const [amenities, _setAmenities] = useState<amenityCheckInterface>({
        'Wifi': false,
        'Beach Access': false,
        'Gym': false,
        'Parking': false,
        'Beach Volleyball': false,
        'Breakfast': false,
        'Cab services': false,
        'Kitchen': false,
        'Swimming Pool': false,
    });

    const amenitiesList = [] as string[];
    
    const keys = Object.keys(amenities);
    let counter = hotelInfo.amenities;
    for(let i = 0; i < keys.length; i++) {
        if(counter%2 == 1) {
            amenitiesList.push(keys[i]);
        }
        counter = counter >> 1;
    }


    return (
        <div>
            <div className='amenities-card'>
                    <div className='card-heading'>
                        Amenities
                    </div>
                    <div className='card-content'>
                        {amenitiesList.map((amenity, index) => (
                            <Amenity amenityName={amenity} key={index}/>
                        ))}
                    </div>
                </div>
        </div>
    )
}