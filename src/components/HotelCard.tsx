import { Button, Checkbox, Paper, Tooltip } from '@mui/material';
import SampleHotel from '../assets/sampleHotel.jpeg';
import '../styles/HotelCard.css';
import { BeachAccess, ChevronRight, Favorite, FavoriteBorder, FreeBreakfast, LocalParking, LocalTaxi, SportsVolleyball, Wifi } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext, AppContextInterface } from './App';
import { Hotel } from './SearchResults';

interface Props {
    hotel: Hotel;
    removeFromWishlist?: (hotel: string) => void;
    addToWishlist?: (hotel: string) => void;
}

export const numNights = (dateRange: Date[]) => Math.floor((dateRange[1]?.getTime() - dateRange[0]?.getTime()) / (1000 * 60 * 60 * 24));

const HotelCard: React.FC<Props> = ({ hotel, removeFromWishlist = () => {}, addToWishlist = () => {} }) => {
    const { setSearchBar, dateRange } = useContext(AppContext) as AppContextInterface;
    const [ isWishlisted, setIsWishlisted ] = useState<boolean>(hotel.isWishlisted || false);

    const navigate = useNavigate();
    const amenities = [<Wifi />, <BeachAccess />, <LocalParking />, <SportsVolleyball />, <FreeBreakfast />, <LocalTaxi />]

    const [mystyle, setMyStyle] = useState("");

    const handleButtonClick = () => {
        if(dateRange.length == 0) {
            alert("Enter a date range in the filters section to continue")
            return;
        }

        setSearchBar(false);
        navigate(`/hotels?hotel_id=${hotel.hotel_id}&dates=${dateRange[0].toISOString().split('T')[0]}__${dateRange[1].toISOString().split('T')[0]}`)
    }

    return (
        <Paper elevation={2} sx={{
                                    display: 'flex',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    marginBottom: '30px',
                                }}>
            <div className='hotelImage'>
                <img src={hotel.img_path} className='image'/>
                <Checkbox onChange={() => {
                    isWishlisted ? [setIsWishlisted(false), removeFromWishlist(hotel.hotel_id)] : [setIsWishlisted(true), addToWishlist(hotel.hotel_id)];
                }} checked={isWishlisted} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{fill: 'crimson'}} />} sx={{
                    position: 'absolute',
                    top: '2%',
                    right: '1.5%',
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                }} />
                
            </div>
            <div className='hotelDetails'>
                <div className='left'>
                    <span className='hotelName'>{hotel.hotel_name}</span>
                    <p className='location'>{hotel.address}</p>
                    <div className='rightTopSpacer'></div>
                    <div className='amenitiesCard'>
                        <div className='vbar'></div>
                        <div className='amenities'>
                            <div className='amenitiesHeading'>Amenities</div>
                            <div className='amenitiesRow'>
                                {amenities.map((amenity, index) => (
                                    <div className='hotel-amenity' key={index}>
                                        <Tooltip title='some amenity'>
                                            {amenity}
                                        </Tooltip>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <div className='rightTop'>
                        <div className='rightTopSpacer'></div>
                        <div className='rightTopRating'>
                            {hotel.rating.toFixed(1)}
                        </div>
                    </div>
                    <div className='rightTop'>
                        <div className='rightTopSpacer'></div>
                        <div className='review'>
                            Excellent reviews
                        </div>
                    </div>
                    <div className='rightVerticalSpacer'></div>
                    <div className='rightPriceSection'>
                        <div className='totalPrice'>
                            <div className='rightTopSpacer'></div>
                            {dateRange.length != 0 && (<div className='price'>
                                ₹ {numNights(dateRange) * hotel.lowest_price}
                            </div>)}
                        </div>
                        <div className='rateSection'>
                            <div className='rightTopSpacer'></div>
                            <div className='rate'>
                                {dateRange.length == 0 && <div>Starting from</div>} ₹ {hotel.lowest_price}/night
                            </div>
                        </div>
                    </div>
                    <div className='rightBottom'>
                        <div className='rightTopSpacer'></div>
                        <Button variant='contained' endIcon={<ChevronRight />} onClick={handleButtonClick} sx={{
                            textTransform: 'none',
                            whiteSpace: 'nowrap',
                        }}>
                            Book Now
                        </Button>
                    </div>
                </div>
            </div>
        </Paper>
    );
}

export default HotelCard;