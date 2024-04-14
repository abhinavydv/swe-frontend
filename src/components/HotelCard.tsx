import { Button, IconButton, Paper } from '@mui/material';
import SampleHotel from '../assets/sampleHotel.jpeg';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import '../styles/HotelCard.css';

const HotelCard = () => {
    return (
        <Paper elevation={3} sx={{
                                    display: 'flex',
                                    padding: '10px',
                                    borderRadius: '10px',
                                }}>
            <div className='hotelImage'>
                <img src={SampleHotel} className='image'/>
                <IconButton sx={{
                                    position: 'absolute',
                                    top: '2%',
                                    right: '1.5%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                }}>
                    <FavoriteBorderOutlinedIcon />
                </IconButton>
            </div>
            <div className='hotelDetails'>
                <div className='left'>
                    <span className='hotelName'>Aalia Villas Anjuna, Goa by Aalia Collection Opens</span>
                    <p className='location'>Anjuna, Goa</p>
                    <div className='amenitiesCard'>
                        <div className='vbar'></div>
                        <div className='amenities'>
                            <div className='amenitiesHeading'>Amenities</div>
                            <div className='amenitiesRow'>

                            </div>
                            <div className='amenitiesRow'>

                            </div>
                        </div>
                    </div>
                </div>
            <div className='right'>
                <div className='rightTop'>
                    <div className='rightTopSpacer'></div>
                    <div className='rightTopRating'>
                        9.0
                    </div>
                </div>
                <div className='rightTop'>
                    <div className='rightTopSpacer'></div>
                    <div className='review'>
                        Excellent reviews
                    </div>
                </div>
                <div className='rightVerticalSpacer'></div>
                <div className='rightPriceSection'>
                    <div className='totalPrice'>
                        <div className='rightTopSpacer'></div>
                        <div className='price'>
                            ₹ 18,000
                        </div>
                    </div>
                    <div className='rateSection'>
                        <div className='rightTopSpacer'></div>
                        <div className='rate'>
                            ₹ 3,000/night
                        </div>
                    </div>
                </div>
                <div className='rightBottom'>
                    <div className='rightTopSpacer'></div>
                    <Button variant='contained' className='bookButton'>
                        Book Now
                    </Button>
                </div>
            </div>
        </div>
    </Paper>
    );
}

export default HotelCard;