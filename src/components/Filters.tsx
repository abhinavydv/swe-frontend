import { Card, Checkbox, FormControl, FormControlLabel, FormGroup, Slider } from "@mui/material";
import '../styles/Filters.css';
import { useContext } from "react";
import { DateRangePicker } from "rsuite";
import { AppContext, AppContextInterface } from "./App";
import { useNavigate } from "react-router-dom";
import { SearchResultsContext, SearchResultsInterface } from "./SearchResults";

const valueText = (value: number) => `₹ ${value}`

interface Props {
    place: string;
    maxLowestPrice: number;
}

const Filters: React.FC<Props> = ({ place, maxLowestPrice }) => {
    const { amenities, setAmenities } = useContext(SearchResultsContext) as SearchResultsInterface;

    const { priceRange, setDateRange, setPriceRange } = useContext(AppContext) as AppContextInterface;

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setAmenities({ ...amenities, [event.target.name]: event.target.checked });

    return (
        <div>
            <Card variant='outlined' sx={{
                        height: 'fit-content%',
                        padding: '0.7rem 0.9rem',
                        width: 'fit-content',
                    }} >
                <div className="adjust-price">
                    <div className="filter-section">
                        <div className="filter-heading">Adjust prices</div>
                        <Slider
                            min={0}
                            max={maxLowestPrice}
                            step={500}
                            size="small"
                            getAriaLabel={() => 'Price range'}
                            valueLabelDisplay="on"
                            value={priceRange}
                            onChange={(_event: Event, newValue: number | number[]) => setPriceRange(newValue as number[])}
                            getAriaValueText={valueText}

                            sx={{
                                marginTop: '2.2rem',
                                marginRight: '2rem',
                            }}
                        />
                    </div>
                    <div className="filter-section">
                        <div className="filter-heading">Select amenities</div>
                        <FormControl component="fieldset" variant="standard">
                            <FormGroup>
                                {Object.keys(amenities).map((amenity, index) => {
                                    const key = amenity;
                                    const value = amenities[amenity];

                                    return (
                                        <FormControlLabel
                                            key={index}
                                            control={
                                            <Checkbox checked={value == true ? true : false} onChange={handleChange} name={key} />
                                            }
                                            label={key}
                                        />
                                    )
                                })}
                            </FormGroup>
                        </FormControl>
                    </div>
                    <div className="filter-heading">Change dates</div>
                    <DateRangePicker
                        placeholder='Check-in - Check-out'
                        size='lg'
                        appearance='subtle'
                        format="yyyy.MM.dd"
                        onChange={(value) => {
                            value && setDateRange(value);
                            navigate(`/search?query=${place}&dates=${value?.[0].toISOString().split('T')[0]}__${value?.[1].toISOString().split('T')[0]}`)
                        }}
                        
                        style={{
                            margin: '0.8rem 0',
                            border: '0.1rem solid #d9d9d9',
                            borderRadius: '0.5rem',
                        }}
                    />
                </div>
            </Card>
        </div>
    )
}

export default Filters;