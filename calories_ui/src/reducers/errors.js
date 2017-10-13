import {
    CREATE_ERROR,
    CLEAR_ERROR
} from '../actions/types';

const initialState = '';

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATE_ERROR:
            return payload;
        case CLEAR_ERROR:
            return initialState;
        default:
            return state;
    }
};