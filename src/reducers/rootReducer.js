import { combineReducers } from 'redux';
import sort from './sortReducer.js';
import filters from './filtersReducer.js';
import astronauts from './astronautReducer.js';

const rootReducer = combineReducers({
    sort,
    filters,
    astronauts
});

export default rootReducer;
