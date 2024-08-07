import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../redux/action/userAction';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const GenderFilter = () => {
    const dispatch = useDispatch();

    const handleGenderChange = (event) => {
        dispatch(setFilter({ gender: event.target.value }));
    };

    return (
        <FormControl variant="outlined" margin="normal" sx={{ minWidth: 120 }}>
            <InputLabel>Gender</InputLabel>
            <Select
                label="Gender"
                onChange={handleGenderChange}
                defaultValue=""
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>

            </Select>
        </FormControl>
    );
};

export default GenderFilter;
