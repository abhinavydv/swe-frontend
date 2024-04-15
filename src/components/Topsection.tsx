import { Person, } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "./App";

const Topsection = () => {
    const isLoggedIn = useContext(AppContext);

    return (
        <div className='topSection'>
            <div id='topContainer'>
                <div className='spacer'></div>
                {isLoggedIn ? (
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
                            width: '3rem',
                            marginLeft: '-0.6rem',
                        }}>
                            <Tooltip title='My Account'>
                                <Person />
                            </Tooltip>
                        </Button>
                    </div>
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