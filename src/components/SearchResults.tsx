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
    setAmenities: (amenities: amenityCheckInterface) => void;
}

export const SearchResultsContext = createContext<Partial<SearchResultsInterface>>({});

const SearchResults = () => {
    const [queryResults, setQueryResults] = useState<QueryResults>();
    const [enteredQuery, setQuery] = useState<string>('');
    const [enteredDates, setDates] = useState<string>('');
    const [hotels, setHotels] = useState<Hotel[]>([
        {
            hotel_id: "1",
            address: "Anjuna, Goa",
            amenities: 4,
            hotel_name: "Aalia Villas Anjuna, Goa by Aalia Collection Opens",
            lowest_price: 3000,
            rating: 9.2,
            img_path: "https://r-cf.bstatic.com/images/hotel/max1024x768/268/268016203.jpg"
        },
        {
            hotel_id: "2",
            address: "Indian Institute of Technology, Hyderabad",
            amenities: 9,
            hotel_name: "International Guest House, IITH",
            lowest_price: 2000,
            rating: 7.0,
            img_path: "https://r-cf.bstatic.com/images/hotel/max1024x768/268/268016203.jpg"
        },
    ]);
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
        const query = window.location.search.split('?')[1].split('&')[0].split('=')[1];
        const dates = window.location.search.split('?')[1].split('&')[1].split('=')[1];
        setQuery(query);
        setDates(dates);
        
        axios.post<QueryResults>(`/search/${query}`).then((res) => {
            setQueryResults(res.data);

            if(res.data.status === "OK") {
                setHotels([...hotels, ...res.data.hotels])
            }
        }, (err) => {
            console.log("Error: ",err);
        });
    },[])

    return (
        <SearchResultsContext.Provider value={{ amenities, setAmenities }}>
        <div>
            <Navbar enteredDates={enteredDates} enteredQuery={enteredQuery} />
            {queryResults?.alert == false ? <SearchResultBody hotels={hotels} place={enteredQuery} maxLowestPrice={findMaxLowestPrice(hotels,dateRange)} /> : (
                <div className="page heading">
                    No results to display
                </div>
            )}
        </div>
        </SearchResultsContext.Provider>
    )
}

export default SearchResults;