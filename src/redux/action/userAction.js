import axios from "axios"

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USERS_FAILURE';
export const SET_SORTING = 'SET_SORTING';
export const SET_FILTER = 'SET_FILTER';

export const fetchUserData = (limit, skip) => async dispatch => {
    dispatch({ type: FETCH_USER_REQUEST });
    try {
        const reponse = await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
        dispatch({ type: FETCH_USER_SUCCESS, payload: reponse.data })
    } catch (error) {
        dispatch({ type: FETCH_USER_FAILURE, error })
    }
}

export const setSorting = (column) => ({
    type: SET_SORTING,
    payload: column
})

export const setFilter = (filter) => ({
    type: SET_SORTING,
    payload: filter
})