import axios from 'axios';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const SET_SORTING = 'SET_SORTING';
export const SET_FILTER = 'SET_FILTER';

export const fetchUserData = (limit, skip, country, gender, sortColumn, sortOrder) => async dispatch => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
        const response = await axios.get('https://dummyjson.com/users', {
            params: { limit, skip, country, gender, sortColumn, sortOrder },
        });
        dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data.users });
    } catch (error) {
        dispatch({ type: FETCH_USERS_FAILURE, error: error.message });
    }
};

export const setFilter = (filterType, value) => (dispatch, getState) => {
    dispatch({ type: SET_FILTER, payload: { filterType, value } });
    const { limit, skip, sortColumn, sortOrder, filters } = getState().users;
    dispatch(fetchUserData(limit, skip, filters.country, filters.gender, sortColumn, sortOrder));
};

export const setSorting = (sortColumn) => (dispatch, getState) => {
    const { sortOrder } = getState().users;
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch({ type: SET_SORTING, payload: { sortColumn, sortOrder: newSortOrder } });
    const { limit, skip, filters } = getState().users;
    dispatch(fetchUserData(limit, skip, filters.country, filters.gender, sortColumn, newSortOrder));
};
