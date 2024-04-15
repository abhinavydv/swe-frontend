import '../styles/Bottomsection.css';
import { Autocomplete, Button, TextField } from '@mui/material';
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.css";
import 'vue-hotel-datepicker/dist/vueHotelDatepicker.css';
import Search from '../assets/search.png'
import * as React from 'react';

interface Props {
    searchBar: boolean;
}

const Bottomsection: React.FC<Props> = ({ searchBar }) => {
    return (
        <div id='bottomContainer'>
            {searchBar ? (
                <div id='bar'>
                    <div id='location'>
                        <Autocomplete
                            freeSolo
                            renderInput={(params) => <TextField {...params} label="Where do you want to go?" />}
                            options={['Option 1', 'Option 2']}
                            sx={{
                                width: '100%',
                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                },
                            }}
                        />
                    </div>
                    <div id='dates'>
                        <DateRangePicker 
                            placeholder='Check-in - Check-out'
                            size='lg'
                            appearance='subtle'
                            format="dd.MM.yyyy"
                        />
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