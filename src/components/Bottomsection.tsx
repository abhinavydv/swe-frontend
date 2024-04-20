import '../styles/Bottomsection.css';
import { Autocomplete, Button, TextField } from '@mui/material';
import { DateRangePicker } from 'rsuite';
import "rsuite/dist/rsuite.css";
import 'vue-hotel-datepicker/dist/vueHotelDatepicker.css';
import Search from '../assets/search.png'
import { ChangeEvent, useContext, useState } from 'react';
import { AppContext, AppContextInterface } from './App';
import { useNavigate } from 'react-router-dom';

interface Props {
    enteredQuery: string | null;
    enteredDates: string | null;
}

const Bottomsection: React.FC<Props> = ({ enteredQuery, enteredDates }) => {
    const { searchBar, dateRange, setDateRange } = useContext(AppContext) as AppContextInterface;
    const [query, setQuery] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        const dates = dateRange.length != 0 ? `${dateRange[0].toISOString().split('T')[0]}__${dateRange[1].toISOString().split('T')[0]}` : '';
        navigate(`/search?query=${query}&dates=${dates}`);
    }

    return (
        <div id='bottomContainer'>
            {searchBar ? (
                <div id='bar'>
                    <div id='location'>
                        {/* <Autocomplete
                            freeSolo
                            renderInput={(params) => <TextField {...params} placeholder="Where do you want to go?" />}
                            options={['Option 1', 'Option 2']}
                            sx={{
                                width: '100%',
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                        /> */}
                        <TextField 
                            sx={{
                                width: '100%',
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                            placeholder= {enteredQuery ? enteredQuery : 'Where do you want to go?'}
                        />
                    </div>
                    <div id='dates'>
                        <DateRangePicker 
                            placeholder='Check-in - Check-out'
                            size='lg'
                            appearance='subtle'
                            format="yyyy.MM.dd"
                            onChange={(value) => value && setDateRange(value)}
                            defaultValue={enteredDates ? [new Date(enteredDates.split('__')[0]), new Date(enteredDates.split('__')[1])] : undefined}
                        />
                    </div>
                    <div id='search'>
                        <Button
                            variant='contained'
                            style={{ padding: '11px 20px' }}
                            startIcon={<img src={Search} id='searchIcon'/>}
                            onClick={handleSubmit}
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