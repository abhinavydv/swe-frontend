import { useEffect, useState } from "react"
import HotelCard from "./HotelCard"
import Navbar from "./Navbar"
import axios from "axios"
import { Hotel, axiosHeader } from "./SearchResults"
import '../styles/Wishlist.css'
import { useNavigate } from "react-router-dom"

// type QueryResults = {
//     status: string;
//     message: string;
//     alert: boolean;
//     wishlist: Hotel[];
// }

export const Wishlist = () => {
    // const [queryResults, setQueryResults] = useState<QueryResults>();
    const [hotels, setHotels] = useState<Hotel[]>([]);

    const navigate = useNavigate();

    const removeFromWishlist = (hotel_id: string) => {
        axios.post('/search/delete_from_wishlist',{hotel_id: parseInt(hotel_id)}, {
            headers: axiosHeader
        }).then((res) => {
            console.log(res.data);
        }, (err) => {
            console.log(err);
        });
    
        setHotels(hotels.filter((h) => h.hotel_id !== hotel_id));
    }


    useEffect(() => {
        axios.get('/search/view_wishlist').then((res) => {
            console.log("data",res.data);

            if(res.data.status == "Error") {
                if(res.data.message == "user not logged in") {
                    navigate('/customer/login');
                }
            } else if(res.data.status == "OK") setHotels(res.data.wishlist);
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