import * as TYPES from '../types/types';

export type SearchPlace = { type: typeof TYPES.SEARCH_PLACE, payload: { query: string } };
export type SuccessSearchPlace = { type: typeof TYPES.SUCCESS_SEARCH_PLACE, payload: { places: Array<object> } };
export type ClearSearchList = { type: typeof TYPES.CLEAR_SEARCH_LIST };

export const searchPlace = (query: string): SearchPlace => ({
  type: TYPES.SEARCH_PLACE,
  payload: { query }
});
export const successSearchPlace = (places: Array<object>): SuccessSearchPlace => ({
  type: TYPES.SUCCESS_SEARCH_PLACE,
  payload: { places }
});
export const clearSearchList = ():ClearSearchList => ({
  type: TYPES.CLEAR_SEARCH_LIST
});