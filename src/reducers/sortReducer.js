import { SORT_BY } from '../constants/sortActionTypes.js';

const initialState = 'name';

export default function (state = initialState, action){
    switch(action.type) {
        case SORT_BY: 
            return action.sortBy;
        default:
            return state;
    }
}