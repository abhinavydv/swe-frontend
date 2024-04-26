import { Add, Person, Remove } from "@mui/icons-material"
import { IconButton, Paper } from "@mui/material"
import '../styles/RoomCard.css'
import SingleBed from '../assets/single-bed.png'
import QueenBed from '../assets/queen-bed.png'
import KingBed from '../assets/king-bed.png'
import Tick from '../assets/tick.png'
import Cross from '../assets/cross.png'
import { useContext, useState } from "react"
import { RoomAmenity } from "./HotelPage"
import { numNights } from "./HotelCard"
import { AppContext, AppContextInterface } from "./App"
import { BookingSummaryContext, BookingSummaryInterface } from "./HotelPageBody"

export const roomTypeMap: {[key: number]: string} = {
    0: 'Standard',
    1: 'Executive',
    2: 'Suite',
    3: 'Executive Suite',
}

interface Props {
    roomType: number;
    capacity: number;
    bedType: string;
    maxAvailable: number;
    roomAmenities: RoomAmenity[];
    rate: number;
}

interface IconMapInterface {
    [key: string]: string;
}

const bedIconMap: IconMapInterface = {
    'Single': SingleBed,
    'Queen': QueenBed,
    'King': KingBed,
}

export const RoomCard: React.FC<Props> = ({ roomType, capacity, bedType, maxAvailable, roomAmenities, rate }) => {
    const { dateRange } = useContext(AppContext) as AppContextInterface;

    const totalPrice = rate*numNights(dateRange);
    
    const { bill, selectedRooms, setBill, setSelectedRooms } = useContext(BookingSummaryContext) as BookingSummaryInterface;
    const [maxFlag, setMaxFlag] = useState(false);

    console.log(dateRange);

    const handleIncrement = () => {
        if(selectedRooms[roomType] == maxAvailable) {
            setMaxFlag(true)
        } else {
            setSelectedRooms(selectedRooms.map((room, index) => {
                if(index == roomType) {
                    return room + 1;
                }
                return room;
            }));
            setBill(bill + totalPrice);
        }
    }

    const handleDecrement = () => {
        if(selectedRooms[roomType] == maxAvailable) {
            setMaxFlag(false);
        }
        if(selectedRooms[roomType] > 0) {
            setSelectedRooms(selectedRooms.map((room, index) => {
                if(index == roomType) {
                    return room - 1;
                }
                return room;
            }));
            setBill(bill - totalPrice);
        }
    }

    return (
        <div>
            <Paper sx={{
                    borderRadius: '5px',
                    padding: '1rem',
                    margin: '1rem 0',
                    flexShrink: '0',
                    display: 'flex',
                    flexDirection: 'row',
                }} elevation={3}>
                <div className="left">
                    <div className='roomType'>
                        {roomTypeMap[roomType]} ● {capacity} <Person />
                    </div>
                    <div className='roomCardContent'>
                        Bed: <img src={bedIconMap[bedType]} className='bedIcon' /> {bedType}-sized bed
                        <div className='features'>
                            {roomAmenities.map((amenity, index) => (
                                amenity.quality == 'good' && (
                                    <div key={index} className="feature">
                                        <img src={Tick} className='green-tick' /> {amenity.name}
                                    </div>
                                )
                            ))}
                            {roomAmenities.map((amenity, index) => (
                                amenity.quality == 'bad' && (
                                    <div key={index} className="bad">
                                        <img src={Cross} className='red-cross' />
                                        <div className="cross-spacer"></div>
                                        <div className="feature">
                                            {amenity.name}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
                <div className="room-card-spacer">

                </div>
                <div className="right">
                    <div className="right-total-price">
                        <div className="price-spacer"></div>
                        <div className="price">
                            ₹{totalPrice}
                        </div>
                    </div>
                    <div className="right-total-price">
                        <div className="price-spacer"></div>
                        <div className="rate">
                            ₹ {rate}/night
                        </div>
                    </div>
                    <div className="right-spacer"></div>
                    {maxFlag && <div className="max-room-warning">
                        <div className="price-spacer"></div>
                        Only {maxAvailable} rooms available!
                    </div>}
                    <div className="add-remove">
                        <div className="price-spacer"></div>
                        <IconButton  sx={{
                            borderRadius: '50%',
                            marginRight: '0.5rem',
                            width: '2.2rem',
                            height: '2.2rem',
                            backgroundColor: 'rgb(15, 145, 215)',
                            "&:hover": { backgroundColor: "white" }
                        }} onClick={handleDecrement}>
                            <Remove sx={{
                                color: 'white',
                                "&:hover": { color: "rgb(15, 145, 215)", }
                            }} />
                        </IconButton>
                        {selectedRooms[roomType]}
                        <IconButton  sx={{
                            borderRadius: '50%',
                            marginLeft: '0.5rem',
                            width: '2.2rem',
                            height: '2.2rem',
                            backgroundColor: 'rgb(15, 145, 215)',
                            "&:hover": { backgroundColor: "white" }
                        }} onClick={handleIncrement}>
                            <Add sx={{
                                color: 'white',
                                "&:hover": { color: "rgb(15, 145, 215)" }
                            }} />
                        </IconButton>
                    </div>
                </div>
            </Paper>
        </div>
    )
}