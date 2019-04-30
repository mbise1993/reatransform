import { Action, Dispatch } from 'redux';

import { UserService, User } from '../domain';
import { createAction } from '../../shared/actions';

export enum UserActionTypes {
  LOGIN = 'LOGIN',
  SIGN_UP = 'SIGN_UP',
  IN_PROGRESS = 'IN_PROGRESS',
  ERROR = 'ERROR',
}

interface ILoginAction {
  readonly type: UserActionTypes.LOGIN;
  readonly payload: {
    readonly user: User;
  };
}

interface ISignUpAction extends Action {
  readonly type: UserActionTypes.SIGN_UP;
  readonly payload: {
    readonly user: User;
  };
}

interface IInProgressAction {
  readonly type: UserActionTypes.IN_PROGRESS;
}

interface IErrorAction {
  readonly type: UserActionTypes.ERROR;
  readonly payload: {
    readonly error: Error;
  };
}

export type UserActions = ILoginAction | ISignUpAction | IInProgressAction | IErrorAction;

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
