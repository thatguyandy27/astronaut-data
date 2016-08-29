import * as types from '../constants/filterActionTypes.js';

export function removeFilter(filter) {
  return { type: types.REMOVE_FILTER, filter };
}

export function addFilter(filter) {
  return { type: types.ADD_FILTER, filter };
}
