import { useContext } from 'react';
import '../styles/SearchResultBody.css';
import Filters from './Filters';
import HotelCard from './HotelCard';
import { Hotel, SearchResultsContext, SearchResultsInterface, amenityCheckInterface, axiosHeader } from './SearchResults';
import { AppContext, AppContextInterface } from './App';
import axios from 'axios';

interface Props {
    place: string;
    maxLowestPrice: number;
}

const numNights = (dateRange: Date[]) => Math.floor((dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 60 * 60 * 24));

const getFilteredHotels = (hotels: Hotel[], dateRange: Date[], priceRange: number[], amenities: amenityCheckInterface) => {
    const dateAndPriceFiltered = dateRange.length == 0 ? hotels.filter(hotel => hotel.lowest_price >= priceRange[0] && hotel.lowest_price <= priceRange[1]) : hotels.filter(hotel => hotel.lowest_price*numNights(dateRange) >= priceRange[0] && hotel.lowest_price*numNights(dateRange) <= priceRange[1]);
    const amenityFiltered = dateAndPriceFiltered.filter(hotel => {
        const keys = Object.keys(amenities);
        for (let i = 0; i < keys.length; i++) {
            if (amenities[keys[i]] && (hotel.amenities >> i)%2 == 0) return false;
        }
        return true;
    });

    return amenityFiltered;
}

const SearchResultBody: React.FC<Props> = ({ place, maxLowestPrice }) => {
    const { dateRange, priceRange } = useContext(AppContext) as AppContextInterface;
    const { amenities, hotels, setHotels } = useContext(SearchResultsContext) as SearchResultsInterface;

    const removeFromWishlist = (hotel_id: string) => {
        axios.post('/search/delete_from_wishlist', {hotel_id: parseInt(hotel_id)}, {
            headers: axiosHeader
        }).then((res) => {
            console.log(res.data);
        }, (err) => {
            console.log(err);
        });

        const updatedHotels = hotels.map((hotel) => {
            if (hotel.hotel_id === hotel_id) {
                return {...hotel, isWishlisted: false};
            }
            return hotel;
        });
        setHotels(updatedHotels);
    }

    const addToWishlist = (hotel_id: string) => {
        axios.post('/search/add_to_wishlist', {hotel_id: parseInt(hotel_id)},{
            headers: axiosHeader
        }).then((res) => {
            console.log(res.data);
        }, (err) => {
            console.log(err);
        });

        const updatedHotels = hotels.map((hotel) => {
            if (hotel.hotel_id === hotel_id) {
                return {...hotel, isWishlisted: true};
            }
            return hotel;
        });
        setHotels(updatedHotels);
    }

    const filteredHotels = getFilteredHotels(hotels,dateRange,priceRange,amenities);

    return (
        <div className='page'>
            <h1 className='heading'>Showing results for {place}</h1>
            <div id='results'>
                <div id='filters'>
                    <Filters place={place} maxLowestPrice={maxLowestPrice} />
                </div>
                <div id='hotels'>
                    {filteredHotels.map((hotel, index) => <HotelCard removeFromWishlist={removeFromWishlist} addToWishlist={addToWishlist} key={index} hotel={hotel} />)}
                </div>
            </div>
        </div>
    );
}

export default SearchResultBody;