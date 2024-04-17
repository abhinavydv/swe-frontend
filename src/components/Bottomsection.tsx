import '../styles/Bottomsection.css';
import { Autocomplete, Button, TextField } from '@mui/material';
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.css";
import 'vue-hotel-datepicker/dist/vueHotelDatepicker.css';
import Search from '../assets/search.png'
import { useContext } from 'react';
import { AppContext, AppContextInterface } from './App';

const Bottomsection = () => {
    const { searchBar } = useContext(AppContext) as AppContextInterface;

    return (
        <div id='bottomContainer'>
            {searchBar ? (
                <div id='bar'>
                    <div id='location'>
                        <Autocomplete
                            freeSolo
                            renderInput={(params) => <TextField {...params} placeholder="Where do you want to go?" />}
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