import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { TransformState, transformReducer } from '../../transforms/reducers';
import { UserState, userReducer } from '../../users/reducers';

export type AppState = {
  readonly transform: TransformState;
  readonly user: UserState;
};

const rootReducer = combineReducers({
  transform: transformReducer,
  user: userReducer,
});

export const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware));
};
