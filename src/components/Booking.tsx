import { Circle, ExpandMoreOutlined, Star } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Box, Rating, TextField, Tooltip } from "@mui/material"
import '../styles/Booking.css'
import { Link } from "react-router-dom"
import { useState } from "react"

export const Booking = () => {
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

    return (
        <div>
            <Accordion elevation={3} sx={{
                padding: '0.5rem',
            }}>
                <AccordionSummary
                expandIcon={<Tooltip title='Submit a review'> <ExpandMoreOutlined /> </Tooltip>}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                <div>
                    <Link to='/hotel' style={{
                        textDecoration: 'none',
                        color: 'black',
                        fontFamily: 'Hind',
                        fontSize: '1.4rem',
                        fontWeight: 800,
                    }}>Aalia Villas Anjuna, Goa by Aalia Collection Opens</Link>
                    <div className='location'>Anjuna, Goa</div>
                    <div className='date-bill location'>
                        <div className="duration">July 14 - July 20</div>
                        <Circle sx={{
                            height: '0.6rem',
                            width: '0.6rem',
                            margin: '0 0.4rem',
                        }} />
                        <div className="total-bill">Total bill: ₹ 18000</div>
                    </div>
                </div>
                </AccordionSummary>
                <AccordionDetails>
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
                            onChange={(event, newValue) => {
                            setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                            setHover(newHover);
                            }}
                            emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Box>
                    <TextField 
                        sx={{
                            width: '100%',
                        }}
                        multiline
                        label='Write a review'
                        onChange={(e) => setReview(e.target.value)}
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}