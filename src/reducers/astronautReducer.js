import { LOAD_ASTRONAUTS, LOAD_ASTRONAUTS_COMPLETE } from '../constants/astronautActionTypes.js';

const initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case LOAD_ASTRONAUTS_COMPLETE:
       return  action.astronauts;
    default: 
        return state;
    }
}
