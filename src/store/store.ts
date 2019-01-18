import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootSagas } from './saga';
import { searchReducer, StateSearch } from './reducer/reducer';

export type CombineReducers = {
  searchData: StateSearch
}

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  searchData: searchReducer
});

const middleware = compose(
  applyMiddleware(
    sagaMiddleware,
    createLogger({ collapsed: true })
  )
);

export const store = createStore(
  reducer,
  middleware
);

sagaMiddleware.run(rootSagas);
