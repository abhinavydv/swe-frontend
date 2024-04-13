import '../styles/SearchResultBody.css';
import HotelCard from './HotelCard';

const SearchResultBody = () => {
    return (
        <div className='page'>
            <h1 className='heading'>Showing results for Place</h1>
            <div id='results'>
                {/* filters should be scrollable */}
                <div id='filters'>

                </div>
                {/* hotels should be scrollable */}
                <div id='hotels'>
                    <HotelCard />
                </div>
                {/* TODO: filters and hotels should be scrollable independently */}
            </div>
        </div>
    );
}

export default SearchResultBody;