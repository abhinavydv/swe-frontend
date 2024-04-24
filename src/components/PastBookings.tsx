import axios from "axios"
import { useEffect, useState } from "react"
import { BookingCard } from "./BookingCard"
import Navbar from "./Navbar"

export type Booking = {
    booking_id: string;
    hotel_id: string;
    hotel_name: string;
    hotel_location: string;
    check_in_date: string;
    check_out_date: string;
    bill: number;
    reviewExists: boolean;
    review?: string;
    rating?: number;
}

type QueryResults = {
    status: string;
    message: string;
    alert: boolean;
    past_bookings: Booking[];
}

export const PastBookings = ()  => {
    const [queryResults, setQueryResults] = useState<QueryResults>();
    const [bookings, setBookings] = useState<Booking[]>([
        // {
        //     booking_id: "1",
        //     hotel_id: "1",
        //     hotel_name: "Aalia Villas Anjuna, Goa by Aalia Collection Opens",
        //     hotel_location: "Anjuna, Goa",
        //     check_in_date: "2021-07-14",
        //     check_out_date: "2021-07-20",
        //     bill: 18000,
        //     reviewExists: false
        // },
        // {
        //     booking_id: "2",
        //     hotel_id: "2",
        //     hotel_name: "International Guest House, IITH",
        //     hotel_location: "Indian Institute of Technology, Hyderabad",
        //     check_in_date: "2021-07-14",
        //     check_out_date: "2021-07-20",
        //     bill: 12000,
        //     reviewExists: true,
        //     review: "It was a good stay",
        //     rating: 8
        // }
    ]);

    useEffect(() => {
        axios.get('/bookings/past_bookings').then((res) => {
            console.log("data",res.data);
            setQueryResults(res.data);

            if(!res.data.alert) {
                setBookings([...bookings,...res.data.past_bookings]);
            }
        }, (err) => {
            console.log(err);
        });
    })

    return (
        <div>
            <Navbar enteredDates={null} enteredQuery={null} />
            <div className="page">
                {true == true && <div className="heading">Past Bookings</div>}
                {true == true ? bookings.map((booking, index) => {
                    return <BookingCard key={index} booking={booking} />
                }) : (
                    <div className="heading">No past bookings found</div>
                )}
            </div>
        </div>
    )
}