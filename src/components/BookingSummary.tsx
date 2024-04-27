import '../styles/BookingSummary.css';
import { Person } from "@mui/icons-material";
import { HotelInfo } from './HotelPage';
import { roomTypeMap } from './RoomCard';

interface Props {
    bill: number;
    selectedRooms: number[];
    hotelInfo: HotelInfo;
    dateRange: Date[];
}

export const BookingSummary: React.FC<Props> = ({ bill, selectedRooms, hotelInfo, dateRange }) => {

    // const { bill, selectedRooms } = useContext(BookingSummaryContext) as BookingSummaryInterface;
    // const { hotelInfo } = useContext(HotelPageContext) as HotelPageInterface;
    // const { dateRange } = useContext(AppContext) as AppContextInterface;

    const availableRooms = hotelInfo.available_rooms;

    const noRoomSelected = () => selectedRooms.every((roomCount) => roomCount == 0);

    return (
        <div className='booking-summary'>
            <div className="summary-heading">Booking Summary</div>
            {noRoomSelected() ? (
                <div className="no-room">No room selected</div>
            ) : (
                <div className="outer">
                    <div className="room-details">
                        {availableRooms.map((room, index) => {
                            if(selectedRooms[room.room_type] > 0) return (
                                <div className="room-detail" key={index}>
                                    {roomTypeMap[room.room_type]} ● {room.max_occupancy} <Person /> X {selectedRooms[room.room_type]}
                                </div>
                            )
                        })}
                    </div>
                    <div className="horizontal-bar"></div>
                    <div className="total">
                        <div className="booking-duration">
                            {dateRange[0].toDateString()} - {dateRange[1].toDateString()}
                        </div>
                        <div className="hori-spacer"></div>
                        <div className="summary-price">
                            ₹{bill}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}