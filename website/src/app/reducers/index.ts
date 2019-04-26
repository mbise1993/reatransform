import { Action } from 'redux';

import { UserState, createDefaultUserState, userReducer } from '../../users/reducers';

export type AppState = {
  entities: {
    user: UserState;
  };
};

export const createDefaultState = () => {
  return {
    entities: {
      user: createDefaultUserState(),
    },
  };
};

export const rootReducer = (state: AppState = createDefaultState(), action: Action) => {
  return {
    entities: {
      user: userReducer(state.entities.user, action),
    },
  };
};
