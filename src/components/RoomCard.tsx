import { Add, Person, Remove } from "@mui/icons-material"
import { IconButton, Paper } from "@mui/material"
import '../styles/RoomCard.css'
import SingleBed from '../assets/single-bed.png'
import QueenBed from '../assets/queen-bed.png'
import KingBed from '../assets/king-bed.png'
import Tick from '../assets/tick.png'
import Cross from '../assets/cross.png'
import { useState } from "react"

interface Props {
    roomType: string;
    capacity: number;
    bedType: string;
    maxAvailable: number;
}

interface IconMapInterface {
    [key: string]: string;
}

const bedIconMap: IconMapInterface = {
    'Single': SingleBed,
    'Queen': QueenBed,
    'King': KingBed,
}

export const RoomCard: React.FC<Props> = ({ roomType, capacity, bedType, maxAvailable }) => {
    const [roomSelectionCount, setRoomSelectionCount] = useState(0);
    const [maxFlag, setMaxFlag] = useState(false);

    const handleIncrement = () => {
        if(roomSelectionCount == maxAvailable) {
            setMaxFlag(true)
        } else {
            setRoomSelectionCount(roomSelectionCount + 1)
        }
    }

    const handleDecrement = () => {
        if(roomSelectionCount == maxAvailable) {
            setMaxFlag(false);
        }
        if(roomSelectionCount > 0) {
            setRoomSelectionCount(roomSelectionCount - 1)
        }
    }

    return (
        <div>
            <Paper sx={{
                    width: '47rem',
                    borderRadius: '5px',
                    padding: '1rem',
                    margin: '1rem 0',
                    flexShrink: '0',
                    display: 'flex',
                    flexDirection: 'row',
                }} elevation={3}>
                <div className="left">
                    <div className='roomType'>
                        {roomType} ● {capacity} <Person />
                    </div>
                    <div className='roomCardContent'>
                        Bed: <img src={bedIconMap[bedType]} className='bedIcon' /> {bedType}-size bed
                        <div className='features'>
                            <div className="feature">
                                <img src={Tick} className='green-tick' /> Free cancellation
                            </div>
                            <div className="feature">
                                <img src={Tick} className='green-tick' /> Complimentary Breakfast
                            </div>
                            <div className="bad">
                                <img src={Cross} className='red-cross' />
                                <div className="cross-spacer"></div>
                                <div className="feature">
                                    Extra charges applicable for lunch and dinner
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="room-card-spacer">

                </div>
                <div className="right">
                    <div className="right-total-price">
                        <div className="price-spacer"></div>
                        <div className="price">
                            ₹18,000
                        </div>
                    </div>
                    <div className="right-total-price">
                        <div className="price-spacer"></div>
                        <div className="rate">
                            ₹ 3,000/night
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
                        {roomSelectionCount}
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