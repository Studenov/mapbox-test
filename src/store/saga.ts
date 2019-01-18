import { fork } from 'redux-saga/effects';

import { sagaSearch as search } from './saga/saga';


export function* rootSagas() {
  yield fork(search);
}
