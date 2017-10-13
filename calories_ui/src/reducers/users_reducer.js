import {FETCH_USERS} from '../actions/types'

const initialState = {
    all: [],
    page: 1,
    limit: 10,
    count: 0,
    sort: 'id',
    order: 'desc'
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_USERS:
            const { page, limit, count, sort, order } = payload;
            return { ...state, all: payload.data, page, limit, count, sort, order};
        default:
            return state;
    }
}