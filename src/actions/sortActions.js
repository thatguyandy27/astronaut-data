import * as types from '../constants/sortActionTypes.js';

export function sortBy(sortBy) {
  return { type: types.SORT_BY, sortBy };
}
