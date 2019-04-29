import { Action, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { IUserState, createDefaultUserState, userReducer } from '../../users/reducers';

export interface IAppState {
  readonly entities: {
    readonly user: IUserState;
  };
}

export const createDefaultState = () => {
  return {
    entities: {
      user: createDefaultUserState(),
    },
  };
};

export const rootReducer = (state: IAppState = createDefaultState(), action: Action): IAppState => {
  return {
    entities: {
      user: userReducer(state.entities.user, action),
    },
  };
};

export const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware));
};
