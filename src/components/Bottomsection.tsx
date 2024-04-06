import '../styles/Bottomsection.css';
import Placeholder from '../assets/placeholder.png';
import Calendar from '../assets/calendar.png';
import { Button, TextField } from '@mui/material';
import Search from '../assets/search.png'
import * as React from 'react';

interface Props {
    searchBar: boolean;
}

const Bottomsection: React.FC<Props> = ({ searchBar }) => {
    return (
        <div id='bottomContainer'>
            {/* TODO: Conditional rendering on bar to be done */}
            {searchBar ? (
                <div id='bar'>
                    <div id='location'>
                        <img src={Placeholder} id='pin'/>
                        <TextField
                            placeholder='Where do you want to go?'
                            variant='standard'
                            fullWidth
                            sx={{mr: '10px'}}
                        />
                    </div>
                    <div id='dates'>
                        <img src={Calendar} id='calendar'/>
                        {/* TODO: Date Range picker not decided yet */}
                    </div>
                    <div id='search'>
                        <Button
                            variant='contained'
                            style={{ padding: '11px 20px' }}
                            startIcon={<img src={Search} id='searchIcon'/>}
                        >Search</Button>
                    </div>
                </div>
            ) :
                null
            }
        </div>
    )
}

export default Bottomsection;