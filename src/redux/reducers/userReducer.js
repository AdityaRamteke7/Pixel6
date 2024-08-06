import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS, FETCH_USER_FAILURE,
    SET_FILTER, SET_SORTING
} from "../action/userAction.js";

const initialState = {
    loading: false,
    users: [],
    error: '',
    sorting: null,
    filter: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return { ...state, loading: true };
        case FETCH_USER_SUCCESS:
            return { ...state, loading: false, users: action.payload.users };
        case FETCH_USER_FAILURE:
            return { ...state, loading: false, error: action.error.message };
        case SET_SORTING:
            return { ...state, sorting: action.payload };
        case SET_FILTER:
            return { ...state, filter: { ...state.filter, ...action.payload } };
        default:
            return state;
    }
};

export default userReducer;
