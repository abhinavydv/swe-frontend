import { Box, Button, Paper } from "@mui/material"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Navbar from "./Navbar"
import { BookingSummary } from "./BookingSummary"
import { useLocation } from "react-router-dom"
import { AppContext, AppContextInterface } from "./App"

type Guest = {
    guest_id: number,
    guest_name: string,
    gender: string,
    age: number,
    user_id: number,
}

interface Props {
    guest: Guest;
    selectedGuests?: boolean[];
    setSelectedGuests: (selectedGuests: boolean[]) => void;
    idx: number;
    maxGuestLimitReached: () => boolean;
    setMaxFlag: (maxFlag: boolean) => void;
}

const GuestCard: React.FC<Props> = ({ guest, selectedGuests, setSelectedGuests, idx, maxGuestLimitReached, setMaxFlag }) => {
    return (
        <div>
            <Paper elevation={2} sx={{
                width: '100%',
                padding: '1.6rem 1.2rem',
                margin: '1rem 0',
            }}>
                <Box sx={{
                    display: 'flex',
                }}>
                    <Box sx={{
                        font: 'Hind',
                        fontWeight: '500',
                        fontSize: '1.2rem',
                    }}>
                        {guest.guest_name} ● {guest.gender} ● {guest.age}
                    </Box>
                    <Box sx={{
                        flexGrow: 1,
                    }}></Box>
                    <Button
                        variant="contained"
                        sx={{
                            textTransform: 'none',
                            backgroundColor: selectedGuests && selectedGuests[idx] ? '#ca2222' : 'rgba(22,95,199,0.9)',
                        }}
                        onClick={() => {
                            if(maxGuestLimitReached() && !(selectedGuests && selectedGuests[idx])) {
                                setMaxFlag(true);
                                return;
                            } else {
                                setMaxFlag(false);
                                selectedGuests && setSelectedGuests(selectedGuests.map((selected, index) => {
                                    if(index === idx) {
                                        return !selected;
                                    }
                                    return selected;
                                }));
                            }
                        }}
                    >
                        {selectedGuests && selectedGuests[idx] ? 'Remove' : 'Add'}
                    </Button>
                </Box>
            </Paper>
        </div>
    )
}

export const SelectGuests = () => {
    const { bill, selectedRooms, hotelInfo, dateRange } = useLocation().state;

    const { setSearchBar } = useContext(AppContext) as AppContextInterface;

    const maxGuestLimitReached = () => selectedGuests?.reduce((total, selected) => total + (selected ? 1 : 0), 0) === maxGuests;

    const [maxGuests, setMaxGuests] = useState(0);
    const [guests, setGuests] = useState<Guest[]>();
    const [selectedGuests, setSelectedGuests] = useState<boolean[]>();
    const [maxFlag, setMaxFlag] = useState(false);

    useEffect(() => {
        axios.get('/bookings/get_guests').then((res) => {
            console.log(res.data);
            if(res.data.status === "OK") {
                setGuests(res.data.guests);
                setSelectedGuests(Array(res.data.guests.length).fill(false));
            }
        }, (err) => {
            console.log("Error",err);
        });

        setSearchBar(false);
        
        const urlParams = new URLSearchParams(window.location.search);
        const _maxGuests = urlParams.get('maxGuests');
        _maxGuests !== null && setMaxGuests(parseInt(_maxGuests));
    },[]);

    return (
        <div>
            <Navbar enteredDates={null} enteredQuery={null} />
            <div className="page">
                {maxFlag ? <Box className="heading" sx={{
                    color: '#ca2222',
                }}>
                    You can add upto {maxGuests} guests
                </Box> : <Box className='heading'>
                    You can add upto {maxGuests} guests
                </Box>}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                }}>
                    <Box sx={{
                        width: '60%',
                    }}>
                        {guests?.map((guest, index) => <GuestCard maxGuestLimitReached={maxGuestLimitReached} setMaxFlag={setMaxFlag} idx={index} guest={guest} key={index} selectedGuests={selectedGuests} setSelectedGuests={setSelectedGuests} />)}
                    </Box>
                    <Box>
                        <BookingSummary bill={bill} selectedRooms={selectedRooms} hotelInfo={hotelInfo} dateRange={dateRange} />
                        <Box sx={{
                            display: 'flex',
                        }}>
                            <Box sx={{flexGrow: 1,}}></Box>
                            <Button
                                variant="contained"
                                sx={{
                                    textTransform: 'none',
                                    marginTop: '2rem',
                                }}
                            >
                                Proceed to payment
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </div>
        </div>
    )
}