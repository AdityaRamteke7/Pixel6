import axios from 'axios';
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const SET_SORTING = 'SET_SORTING';
export const SET_FILTER = 'SET_FILTER';

export const fetchUserData = (limit, skip, country, gender) => async dispatch => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
        const response = await axios.get('https://dummyjson.com/users', {
            params: { limit, skip, country, gender },
        });
        dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data.users });
    } catch (error) {
        dispatch({ type: FETCH_USERS_FAILURE, error });
    }
};

export const setFilter = (filter) => ({
    type: SET_FILTER,
    payload: filter,
});

export const setSorting = (sorting) => ({
    type: SET_SORTING,
    payload: sorting
});