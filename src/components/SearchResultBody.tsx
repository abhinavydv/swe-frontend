import { useContext } from 'react';
import '../styles/SearchResultBody.css';
import Filters from './Filters';
import HotelCard from './HotelCard';
import { Hotel } from './SearchResults';
import { AppContext, AppContextInterface } from './App';

interface Props {
    place: string;
    hotels: Hotel[];
    maxLowestPrice: number;
}

const numNights = (dateRange: Date[]) => Math.floor((dateRange[1].getTime() - dateRange[0].getTime()) / (1000 * 60 * 60 * 24));

const SearchResultBody: React.FC<Props> = ({ place, hotels, maxLowestPrice }) => {
    const { dateRange, priceRange } = useContext(AppContext) as AppContextInterface;
    const filteredHotels = dateRange.length == 0 ? hotels.filter(hotel => hotel.lowest_price >= priceRange[0] && hotel.lowest_price <= priceRange[1]) : hotels.filter(hotel => hotel.lowest_price*numNights(dateRange) >= priceRange[0] && hotel.lowest_price*numNights(dateRange) <= priceRange[1]);

    return (
        <div className='page'>
            <h1 className='heading'>Showing results for {place}</h1>
            <div id='results'>
                <div id='filters'>
                    <Filters place={place} maxLowestPrice={maxLowestPrice} />
                </div>
                <div id='hotels'>
                    {filteredHotels.map((hotel, index) => <HotelCard key={index} hotel={hotel} />)}
                </div>
            </div>
        </div>
    );
}

export default SearchResultBody;