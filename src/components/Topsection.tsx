import { Person, } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { useContext } from "react";
import { AppContext, AppContextInterface } from "./App";
import { useNavigate } from "react-router-dom";

const Topsection = () => {
    const { user, setSearchBar } = useContext(AppContext) as AppContextInterface;
    const navigate = useNavigate();

    return (
        <div className='topSection'>
            <div id='topContainer'>
                <div className='spacer'></div>
                {user?.isLoggedIn ? (
                    user.role === 'customer' ? (
                        <div className='tabSection'>
                            <Button sx={{
                                color: 'white',
                                fontWeight: '100',
                                textTransform: 'none',
                                letterSpacing: '0.06rem',
                            }}>
                                View my bookings
                            </Button>
                            <div className='separator'></div>
                            <Button sx={{
                                color: 'white',
                                fontWeight: '100',
                                textTransform: 'none',
                                letterSpacing: '0.06rem',
                            }} onClick={() => {setSearchBar(false); navigate('/user/wishlist')}}>
                                Hotel wishlist
                            </Button>
                            <div className='separator'></div>
                            <Button sx={{
                                color: 'white',
                                fontWeight: '300',
                                paddingX: '0.5rem',
                                minHeight: '0',
                                minWidth: '0',
                                borderRadius: '50%',
                            }} onClick={() => {navigate('/profile')}}>
                                <Tooltip title='My Account'>
                                    <Person />
                                </Tooltip>
                            </Button>
                        </div>
                    ) : (
                        <div className='tabSection'>
                            <Button sx={{
                                color: 'white',
                                fontWeight: '100',
                                textTransform: 'none',
                                letterSpacing: '0.06rem',
                            }}>
                                View listings
                            </Button>
                            <div className='separator'></div>
                            <Button sx={{
                                color: 'white',
                                fontWeight: '100',
                                textTransform: 'none',
                                letterSpacing: '0.06rem',
                            }}>
                                Add hotel
                            </Button>
                            <div className='separator'></div>
                            <Button sx={{
                                color: 'white',
                                fontWeight: '300',
                                paddingX: '0.5rem',
                                minHeight: '0',
                                minWidth: '0',
                                borderRadius: '50%',
                            }} onClick={() => {navigate('/profile')}}>
                                <Tooltip title='My Account'>
                                    <Person/>
                                </Tooltip>
                            </Button>
                        </div>
                    )
                ) : <div className='tabSection'>
                        <Button sx={{
                            color: 'white',
                            fontWeight: '100',
                            textTransform: 'none',
                            letterSpacing: '0.06rem',
                        }} onClick={() => {navigate('/customer/register')}}>
                            New here? Register Now
                        </Button>
                        <div className='separator'></div>
                        <Button sx={{
                            color: 'white',
                            fontWeight: '100',
                            textTransform: 'none',
                            letterSpacing: '0.06rem',
                        }} onClick={() => {navigate('/customer/login')}}>
                            Log in
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Topsection;