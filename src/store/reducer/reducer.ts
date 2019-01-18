import * as TYPES from '../types/types';
import { createReducer } from '../../utils/utility';

export type StateSearch = {
  query: string,
  places: [
    {
      place_name?: string,
      center?: Array<number>
    }?
  ]
};
type SearchPlacePayload = { query: StateSearch['query'] };
type SuccessSearchPlacePayload = { places: StateSearch['places'] };
type ActionHandlerSearch<T> = (state: StateSearch, payload: T) => StateSearch;
type ClearSearchList = () => StateSearch;

const initState: StateSearch = {
  query: '',
  places: []
}

const searchPlace: ActionHandlerSearch<SearchPlacePayload> = (state: StateSearch, { query }) => ({ ...state, query });
const successSearchPlace: ActionHandlerSearch<SuccessSearchPlacePayload> = (state: StateSearch, { places }) => ({ ...state, places });
const clearSearchList: ClearSearchList = () => initState;

const handlers = {
  [TYPES.SEARCH_PLACE]: searchPlace,
  [TYPES.SUCCESS_SEARCH_PLACE]: successSearchPlace,
  [TYPES.CLEAR_SEARCH_LIST]: clearSearchList
}

export const searchReducer = createReducer(initState, handlers);