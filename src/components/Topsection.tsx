import { Person, } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "./App";

const Topsection = () => {
    const { user } = useContext(AppContext);

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
                            }}>
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
                            }}>
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
                                View bookings
                            </Button>
                            <div className='separator'></div>
                            <Button sx={{
                                color: 'white',
                                fontWeight: '300',
                                paddingX: '0.5rem',
                                minHeight: '0',
                                minWidth: '0',
                                borderRadius: '50%',
                            }}>
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
                        }}>
                            New here? Register Now
                        </Button>
                        <div className='separator'></div>
                        <Button sx={{
                            color: 'white',
                            fontWeight: '100',
                            textTransform: 'none',
                            letterSpacing: '0.06rem',
                        }}>
                            Log in
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Topsection;