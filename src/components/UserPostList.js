import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, setSorting } from '../redux/action/userAction';
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
} from '@mui/material';
import { styled } from '@mui/system';
import CountryFilter from './CountryFilter';
import GenderFilter from './GenderFliter';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    cursor: 'pointer',
    fontWeight: 'bold',
}));

const UserList = () => {
    const [page, setPage] = useState(0);
    const limit = 10;
    const { users, loading, error, filters } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const observerRef = useRef();

    useEffect(() => {
        const { country, gender } = filters;
        dispatch(fetchUserData(limit, page * limit, country, gender));
    }, [dispatch, limit, page, filters]);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !loading) {
                setPage((prev) => prev + 1);
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
    }, [loading]);

    const handleSort = (column) => {
        dispatch(setSorting(column));
    };

    return (
        <Box sx={{ margin: 2 }}>
            <Typography variant="h4" component="div" gutterBottom>
                Employees
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 ,gap:"10px", padding:"2px"}}>
                <CountryFilter />
                <GenderFilter />
            </Box>
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell onClick={() => handleSort('id')}>
                                ID
                                <TableSortLabel />
                            </StyledTableCell>
                            <TableCell>Image</TableCell>
                            <StyledTableCell onClick={() => handleSort('name')}>
                                Full Name
                                <TableSortLabel />
                            </StyledTableCell>
                            <TableCell>Demography</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell>Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((user, index) => (
                            <TableRow key={user.id || index} ref={index === users.length - 1 ? observerRef : null}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>
                                    <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.image} sx={{ marginRight: 1 }} />
                                </TableCell>
                                <TableCell>{user.firstName} {user.lastName}</TableCell>
                                <TableCell>{`${user.gender.charAt(0).toUpperCase()}/${user.age}`}</TableCell>
                                <TableCell>{user.company.title}</TableCell>
                                <TableCell>{user.address.city}, {user.address.state}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserList;
