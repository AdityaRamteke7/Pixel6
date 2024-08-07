import { FETCH_USERS_SUCCESS, FETCH_USERS_REQUEST, FETCH_USERS_FAILURE, SET_FILTER, SET_SORTING } from "../action/userAction";



const initialState = {
    users: [],
    loading: false,
    error: null,
    sortColumn: 'id',
    sortOrder: 'asc',
    limit: 10,
    skip: 0,
    filters: {
        country: '',
        gender: '',
    },
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return { ...state, loading: true };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [...state.users, ...action.payload],
            };
        case FETCH_USERS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case SET_SORTING:
            return {
                ...state,
                sortColumn: action.payload.sortColumn,
                sortOrder: action.payload.sortOrder,
                users: [],
                skip: 0,
            };
        case SET_FILTER:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.filterType]: action.payload.value,
                },
                users: [],
                skip: 0,
            };
        default:
            return state;
    }
};

export default userReducer;
