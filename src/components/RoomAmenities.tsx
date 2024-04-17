import Beach from '../assets/beach.png';
import Wifi from '../assets/wifi.png';
import AC from '../assets/ac.png';
import MiniBar from '../assets/minibar.png';
import BathRoom from '../assets/bath.png';
import '../styles/RoomAmenities.css';

interface AmenityProps {
    amenityName: string;
}

interface IconMapInterface {
    [key: string]: string;
}

const amenityIconMap: IconMapInterface = {
    'Seafront room': Beach,
    'Free WiFi': Wifi,
    'Air conditioning': AC,
    'Minibar': MiniBar,
    'Private Bathroom': BathRoom,
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
    const amenitiesList = ['Free WiFi', 'Air conditioning', 'Minibar', 'Private Bathroom', 'Free WiFi', 'Air conditioning']

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