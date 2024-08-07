import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    SET_SORTING,
    SET_FILTER,
} from '../action/userAction';

const initialState = {
    loading: false,
    users: [],
    error: '',
    sorting: null,
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
            return { ...state, loading: false, users: [...state.users, ...action.payload] };
        case FETCH_USERS_FAILURE:
            return { ...state, loading: false, error: action.error.message };
        case SET_SORTING:
            return { ...state, sorting: action.payload };
        case SET_FILTER:
            return { ...state, filters: { ...state.filters, ...action.payload } };
        default:
            return state;
    }
};

export default userReducer;
