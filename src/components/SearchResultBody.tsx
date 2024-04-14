import '../styles/SearchResultBody.css';
import Filters from './Filters';
import HotelCard from './HotelCard';

const SearchResultBody = () => {
    return (
        <div className='page'>
            <h1 className='heading'>Showing results for Place</h1>
            <div id='results'>
                <div id='filters'>
                    <Filters />
                </div>
                <div id='hotels'>
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                    <HotelCard />
                </div>
                {/* TODO: filters and hotels should be scrollable independently */}
            </div>
        </div>
    );
}

export default SearchResultBody;