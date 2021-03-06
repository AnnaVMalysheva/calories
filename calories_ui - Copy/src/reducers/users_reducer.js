import {FETCH_USERS} from '../actions/types'

export default function(state={all: []}, action) {
    switch (action.type) {
        case FETCH_USERS:
            return { ...state, all: action.payload};;
        default:
            return state;
    }
}