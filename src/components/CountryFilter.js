import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/action/userAction';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const CountryFilter = () => {
    const dispatch = useDispatch();

    const handleCountryChange = (event) => {
        dispatch(setFilter({ country: event.target.value }));
    };

    return (
        <FormControl variant="outlined" margin="normal" sx={{ minWidth: 120 }}>
            <InputLabel>Country</InputLabel>
            <Select
                label="Country"
                onChange={handleCountryChange}
                defaultValue=""
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value="United States">United States</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="United Kingdom">United Kingdom</MenuItem>
            </Select>
        </FormControl>
    );
};

export default CountryFilter;
