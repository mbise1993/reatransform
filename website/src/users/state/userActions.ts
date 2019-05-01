import { Dispatch } from 'redux';

import { UserService, User } from '../domain';
import { createAction } from '../../shared/state';

export enum UserActionTypes {
  LOGIN = 'user/LOGIN',
  SIGN_UP = 'user/SIGN_UP',
  IN_PROGRESS = 'user/IN_PROGRESS',
  ERROR = 'user/ERROR',
}

type LoginAction = {
  readonly type: UserActionTypes.LOGIN;
  readonly payload: {
    readonly user: User;
  };
};

type SignUpAction = {
  readonly type: UserActionTypes.SIGN_UP;
  readonly payload: {
    readonly user: User;
  };
};

type InProgressAction = {
  readonly type: UserActionTypes.IN_PROGRESS;
};

type ErrorAction = {
  readonly type: UserActionTypes.ERROR;
  readonly payload: {
    readonly error: Error;
  };
};

export type UserActions = LoginAction | SignUpAction | InProgressAction | ErrorAction;

export const login = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(UserActionTypes.IN_PROGRESS));
    try {
      const user = await UserService.login(username, password);
      return dispatch(createAction(UserActionTypes.LOGIN, { user }));
    } catch (e) {
      return dispatch(createAction(UserActionTypes.ERROR, { error: e }));
    }
  };
};

export const signUp = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(UserActionTypes.IN_PROGRESS));
    try {
      const user = await UserService.register(username, password);
      return dispatch(createAction(UserActionTypes.SIGN_UP, { user }));
    } catch (e) {
      return dispatch(createAction(UserActionTypes.ERROR, { error: e }));
    }
  };
};
