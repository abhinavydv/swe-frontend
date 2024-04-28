import { createContext, useContext, useEffect, useState } from "react";
import { AppContext, AppContextInterface } from "./App";
import Navbar from "./Navbar";
import SearchResultBody from "./SearchResultBody";
import axios from "axios";
import { numNights } from "./HotelCard";

export type Hotel = {
    hotel_id: string;
    address: string;
    amenities: number;
    hotel_name: string;
    lowest_price: number;
    rating: number;
    img_path: string;
    isWishlisted?: boolean;
}

type QueryResults = {
    status: string;
    message: string;
    alert: boolean;
    hotels: Hotel[];
}

const findMaxLowestPrice = (hotels: Hotel[], dateRange: Date[]) => {
    return dateRange.length == 0 ? Math.max(...hotels.map(hotel => hotel.lowest_price)) : Math.max(...hotels.map(hotel => hotel.lowest_price*numNights(dateRange)));
};

export interface amenityCheckInterface {
    [key: string]: boolean;
}

export interface SearchResultsInterface {
    amenities: amenityCheckInterface;
    hotels: Hotel[];
    setAmenities: (amenities: amenityCheckInterface) => void;
    setHotels: (hotels: Hotel[]) => void;
}

export const axiosHeader = {
    "Content-Type": "application/json",
}

export const SearchResultsContext = createContext<Partial<SearchResultsInterface>>({});

const SearchResults = () => {
    const [queryResults, setQueryResults] = useState<QueryResults>();
    const [enteredQuery, setQuery] = useState<string>('');
    const [enteredDates, setDates] = useState<string>('');
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [amenities, setAmenities] = useState<amenityCheckInterface>({
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

    const { dateRange } = useContext(AppContext) as AppContextInterface;

    useEffect(() => {
        let query = window.location.search.split('?')[1].split('&')[0].split('=')[1];
        query = query.split('%20').join(' ');
        const dates = window.location.search.split('?')[1].split('&')[1].split('=')[1];
        setQuery(query);
        setDates(dates);

        const data = {text: query, date_range: dates};
        
        axios.post('/search/',data,{
            headers: axiosHeader,
        }).then((res) => {
            setQueryResults(res.data);

            if(res.data.status === "OK") {
                setHotels(res.data.hotels);
            }
        }, (err) => {
            console.log("Error: ",err);
        });
    },[])

    return (
        <SearchResultsContext.Provider value={{ amenities, hotels, setAmenities, setHotels }}>
        <div>
            <Navbar enteredDates={enteredDates} enteredQuery={enteredQuery} />
            {queryResults?.alert == false ? <SearchResultBody place={enteredQuery} maxLowestPrice={findMaxLowestPrice(hotels,dateRange)} /> : (
                <div className="page heading">
                    No results to display
                </div>
            )}
        </div>
        </SearchResultsContext.Provider>
    )
}

export default SearchResults;