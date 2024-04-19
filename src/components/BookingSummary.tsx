import '../styles/BookingSummary.css';
import { Person } from "@mui/icons-material";

type room = {
    roomType: string;
    capacity: number;
    rate: number;
    numSelected: number;
}

interface Props {
    selectedRooms: room[];
    duration: [Date, Date]
}

export const BookingSummary: React.FC<Props> = ({ selectedRooms, duration }) => {

    const noRoomSelected = () => selectedRooms.length === 0;
    let totalPrice = 0;

    return (
        <div className='booking-summary'>
            <div className="summary-heading">Booking Summary</div>
            {noRoomSelected() ? (
                <div className="no-room">No room selected</div>
            ) : (
                <div className="outer">
                    <div className="room-details">
                        {selectedRooms.map((room, index) => {
                            totalPrice += room.rate * room.numSelected;

                            return (
                                <div className="room-detail" key={index}>
                                    {room.roomType} ● {room.capacity} <Person /> X {room.numSelected}
                                </div>
                            )
                        })}
                    </div>
                    <div className="horizontal-bar"></div>
                    <div className="total">
                        <div className="booking-duration">
                            {duration[0].toDateString()} - {duration[1].toDateString()}
                        </div>
                        <div className="hori-spacer"></div>
                        <div className="summary-price">
                            ₹{totalPrice}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}