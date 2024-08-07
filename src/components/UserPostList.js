import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, setSorting, setFilter } from '../redux/action/userAction';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TableSortLabel,
    Avatar,
    Box,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    cursor: 'pointer',
    fontWeight: 'bold',
}));

const UserPostList = () => {
    const dispatch = useDispatch();
    const { users, loading, error, sortColumn, sortOrder, filters, limit, skip, hasMore } = useSelector(state => state.users);
    const observerRef = useRef();

    useEffect(() => {
        dispatch(fetchUserData(limit, 0, filters.country, filters.gender, sortColumn, sortOrder));
    }, [dispatch, filters.country, filters.gender, sortColumn, sortOrder]);

    const loadMoreUsers = useCallback(() => {
        if (!loading && hasMore) {
            dispatch(fetchUserData(limit, users.length, filters.country, filters.gender, sortColumn, sortOrder));
        }
    }, [dispatch, loading, users.length, filters.country, filters.gender, sortColumn, sortOrder, hasMore]);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                loadMoreUsers();
            }
        }, option);

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [loadMoreUsers]);

    const handleSort = (column) => {
        dispatch(setSorting(column));
    };

    const handleFilterChange = (filterType) => (event) => {
        dispatch(setFilter({ [filterType]: event.target.value }));
    };

    return (
        <Box sx={{ margin: 2 }}>
            <Typography variant="h4" component="div" gutterBottom>
                Employees
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
                    <InputLabel>Country</InputLabel>
                    <Select value={filters.country} onChange={handleFilterChange('country')}>
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="United States">United States</MenuItem>
                        <MenuItem value="Canada">Canada</MenuItem>
                        <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Gender</InputLabel>
                    <Select value={filters.gender} onChange={handleFilterChange('gender')}>
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell onClick={() => handleSort('id')}>
                                ID
                                <TableSortLabel active={sortColumn === 'id'} direction={sortOrder}>
                                    {sortOrder === 'asc'}
                                </TableSortLabel>
                            </StyledTableCell>
                            <TableCell>Image</TableCell>
                            <StyledTableCell onClick={() => handleSort('name')}>
                                Full Name
                                <TableSortLabel active={sortColumn === 'name'} direction={sortOrder}>
                                    {sortOrder === 'asc'}
                                </TableSortLabel>
                            </StyledTableCell>
                            <TableCell>Demography</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell>Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((user, index) => (
                            <TableRow key={user.id} ref={index === users.length - 1 ? observerRef : null}>
                                <TableCell>{user.id < 10 ? `0${user.id}` : user.id}</TableCell>
                                <TableCell>
                                    <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.image} sx={{ marginRight: 1 }} />
                                </TableCell>
                                <TableCell>{user.firstName} {user.lastName}</TableCell>
                                <TableCell>{`${user.gender.charAt(0).toUpperCase()}/${user.age}`}</TableCell>
                                <TableCell>{user.company.title}</TableCell>
                                <TableCell>{user.address.city}, {user.address.state}, {user.address.country}</TableCell>
                            </TableRow>
                        ))}
                        <div ref={observerRef} />
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserPostList;
