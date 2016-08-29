import { ADD_FILTER, REMOVE_FILTER } from '../constants/filterActionTypes.js';

const initialState = {
};

export default function (state = initialState, action){
    switch(action.type) {
        case ADD_FILTER: 
            return Object.assign({}, state, action.filter);
        case REMOVE_FILTER: 
            let newState = Object.assign({}, state);
            delete newState[action.filter.name];
            return newState;
        default:
            return state;
    }
}