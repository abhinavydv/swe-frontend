import { Booking } from "./Booking"
import Navbar from "./Navbar"

export const PastBookings = ()  => {
    return (
        <div>
            <Navbar enteredDates={null} enteredQuery={null} />
            <div className="page">
                <Booking />
            </div>
        </div>
    )
}