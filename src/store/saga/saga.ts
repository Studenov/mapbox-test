import { delay } from 'redux-saga';
import { put, takeLatest, call, CallEffect, PutEffect } from 'redux-saga/effects';

import * as TYPES from '../types/types';
import * as ACTIONS from '../actions/actions';
import * as API from './helpers/helpers';

type SearchEffect = PutEffect<ACTIONS.SearchPlace | ACTIONS.SuccessSearchPlace> | CallEffect | Promise<true>;
type SearchData = {
  payload: {
    query: string
  },
  type: string
}

function* searchPlace({ payload }: SearchData): IterableIterator<SearchEffect> {
  yield delay(500);
  const { query } = payload;
  try {
    const { features } = yield call(API.searchPlace, query);
    yield put(ACTIONS.successSearchPlace(features));
  } catch (e) {
    console.log(e.message);
  }
}

export function* sagaSearch() {
  yield takeLatest(TYPES.SEARCH_PLACE, searchPlace);
}