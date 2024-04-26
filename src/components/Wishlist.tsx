import { useEffect, useState } from "react"
import HotelCard from "./HotelCard"
import Navbar from "./Navbar"
import axios from "axios"
import { Hotel } from "./SearchResults"
import '../styles/Wishlist.css'

type QueryResults = {
    status: string;
    message: string;
    alert: boolean;
    wishlist: Hotel[];
}

export const Wishlist = () => {
    const [queryResults, setQueryResults] = useState<QueryResults>();
    const [hotels, setHotels] = useState<Hotel[]>([
        // {
        //     hotel_id: "1",
        //     address: "Anjuna, Goa",
        //     amenities: 4,
        //     hotel_name: "Aalia Villas Anjuna, Goa by Aalia Collection Opens",
        //     lowest_price: 3000,
        //     rating: 9.2,
        //     img_path: "https://r-cf.bstatic.com/images/hotel/max1024x768/268/268016203.jpg",
        //     isWishlisted: true
        // },
        // {
        //     hotel_id: "2",
        //     address: "Indian Institute of Technology, Hyderabad",
        //     amenities: 9,
        //     hotel_name: "International Guest House, IITH",
        //     lowest_price: 2000,
        //     rating: 7.0,
        //     img_path: "https://r-cf.bstatic.com/images/hotel/max1024x768/268/268016203.jpg",
        //     isWishlisted: true
        // },
    ]);

    const removeFromWishlist = (hotel_id: string) => {
        axios.post('/search/delete_from_wishlist', {hotel_id: hotel_id}).then((res) => {
            console.log(res.data);
        }, (err) => {
            console.log(err);
        });
    
        setHotels(hotels.filter((h) => h.hotel_id !== hotel_id));
    }


    useEffect(() => {
        axios.get('/search/view_wishlist').then((res) => {
            console.log("data",res.data);
            setQueryResults(res.data);

            if(!res.data.alert) {
                setHotels([...hotels,...res.data.wishlist]);
            }
        }, (err) => {
            console.log(err);
        })
    },[])

    return (
        <div>
            <Navbar enteredDates={null} enteredQuery={null} />
            <div className="page">
                {hotels.length != 0 ? (<div id='hotels'>
                    {hotels.map((hotel, index) => <HotelCard hotel={hotel} removeFromWishlist={removeFromWishlist} key={index} />)}
                </div>) : (
                    <div className='heading'>
                        No hotels added to your wishlist
                    </div>
                )}
            </div>
        </div>
    )
}