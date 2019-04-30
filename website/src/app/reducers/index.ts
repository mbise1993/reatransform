import { Action, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { ITransformState, createDefaultTransformState, transformReducer } from '../../transforms/reducers';
import { IUserState, createDefaultUserState, userReducer } from '../../users/reducers';

export interface IAppState {
  readonly entities: {
    readonly transform: ITransformState;
    readonly user: IUserState;
  };
}

export const createDefaultState = () => {
  return {
    entities: {
      transform: createDefaultTransformState(),
      user: createDefaultUserState(),
    },
  };
};

export const rootReducer = (state: IAppState = createDefaultState(), action: Action): IAppState => {
  return {
    entities: {
      transform: transformReducer(state.entities.transform, action),
      user: userReducer(state.entities.user, action),
    },
  };
};

export const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunkMiddleware));
};
