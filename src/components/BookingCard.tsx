import { Circle, ExpandMoreOutlined, Star } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Rating, TextField } from "@mui/material"
import '../styles/Booking.css'
import { Link } from "react-router-dom"
import { useState } from "react"
import { Booking } from "./PastBookings"
import axios, { AxiosHeaders } from "axios"
import { axiosHeader } from "./SearchResults"

interface Props {
    booking: Booking;
    bookings: Booking[];
    setBookings: (bookings: Booking[]) => void;
}

export const BookingCard: React.FC<Props> = ({ booking, bookings, setBookings }) => {
    const labels: { [index: string]: string } = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    const getLabelText = (value: number) => {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const [review, setReview] = useState<string>('');
    const [value, setValue] = useState<number | null>(2);
    const [hover, setHover] = useState(-1);

    const today = new Date().toISOString().split("T")[0];

    console.log(booking);

    const submitReview = () => {
        const data = {
            booking_id: booking.booking_id,
            hotel_id: booking.hotel_id,
            rating: value !== null ? value * 2 : 0,
            title: '',
            description: review,
        }

        axios.post('/review/submit_review',data,{
            headers: axiosHeader,
        }).then((res: any) => {
            console.log(res.data);
            if(res.data.status === 'OK') {
                setBookings(bookings.map((booking) => {
                    if(booking.booking_id === data.booking_id) {
                        booking.review = data.description;
                        booking.rating = data.rating;
                        booking.reviewExists = true;
                    }
                    return booking;
                }))
            } else if (res.data.alert) {
                alert(res.data.message)
            }
        }, (err) => {
            console.log(err);
        })
    }

    const deleteReview = () => {
        const data = {
            booking_id: booking.booking_id,
        }
        
        axios.post('/review/delete_review',data,{
            headers: axiosHeader,
        }).then((res) => {
            console.log(res.data);
            if(res.data.status === 'OK') {
                setBookings(bookings.map((booking, index) => {
                    if(booking.booking_id === data.booking_id) {
                        booking.review = '';
                        booking.rating = 0;
                        booking.reviewExists = false;
                    }

                    return booking;
                }))
            }
        })
    }

    const [isCancelled, setIsCancelled] = useState(booking.status == -1);

    return (
        <div>
            <Accordion elevation={3} sx={{
                padding: '0.5rem',
                margin: '1.5rem 0',
            }}>
                <AccordionSummary
                expandIcon={<ExpandMoreOutlined />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                    <Box sx={{display: "flex", flexDirection: "row", width: "100%"}}>
                        <div>
                            <Link to='/hotel' style={{
                                textDecoration: 'none',
                                color: 'black',
                                fontFamily: 'Hind',
                                fontSize: '1.4rem',
                                fontWeight: 800,
                            }}>{booking.hotel_name}</Link>
                            <div className='location'>{booking.hotel_location}</div>
                            <div className='date-bill location'>
                                <div className="duration">{booking.check_in_date} - {booking.check_out_date}</div>
                                <Circle sx={{
                                    height: '0.6rem',
                                    width: '0.6rem',
                                    margin: '0 0.4rem',
                                }} />
                                <div className="total-bill">Total bill: ₹ {booking.bill}</div>
                            </div>
                        </div>
                        <Box flexGrow={1} />
                        <Box>
                            {booking.check_in_date > today && <Button variant="contained" color="error"
                                onClick={async () => {

                                    const res = await axios.post('/bookings/cancel', {
                                        booking_id: booking.booking_id
                                    })
                                    console.log(res.data)
                                    setIsCancelled(true);
                                }}
                                disabled={isCancelled}
                            >
                                {isCancelled ? 'Cancelled' : 'Cancel'}
                            </Button>}
                        </Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                        {booking.reviewExists || isCancelled ? (
                            <>
                            <Box sx={{
                                display: 'flex',
                                mb: 2,
                                alignItems: 'center',
                            }}>
                                <Rating
                                    readOnly
                                    name="hover-feedback"
                                    value={(booking.rating as number)/2}
                                    precision={0.5}
                                    getLabelText={getLabelText}
                                    onChange={(_event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    onChangeActive={(_event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {value !== null && (
                                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                )}
                                <Button
                                    variant='contained'
                                    style={{ padding: '11px 20px', marginLeft: 'auto', backgroundColor: '#ca2222'}}
                                    onClick={deleteReview}
                                >
                                    Delete
                                </Button>
                            </Box>
                            <TextField 
                                sx={{
                                    width: '100%',
                                }}
                                multiline
                                label='Review'
                                value={booking.review}
                                disabled 
                            />
                            </>
                        ) : (
                            <>
                            <Box sx={{
                                display: 'flex',
                                mb: 2,
                                alignItems: 'center',
                            }}>
                                <Rating
                                    name="hover-feedback"
                                    value={value}
                                    precision={0.5}
                                    getLabelText={getLabelText}
                                    onChange={(_event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    onChangeActive={(_event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {value !== null && (
                                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                )}
                                <Button
                                    variant='contained'
                                    disabled={review === '' || value === null}
                                    style={{ padding: '11px 20px', marginLeft: 'auto' }}
                                    onClick={submitReview}
                                >
                                    Submit
                                </Button>
                            </Box>
                            <TextField 
                                sx={{
                                    width: '100%',
                                }}
                                multiline
                                label='Write a review'
                                onChange={(e) => setReview(e.target.value)}
                                value={review}
                            />
                            </>
                        )}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}