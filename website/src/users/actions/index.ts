import { Action, Dispatch } from 'redux';

import { UserService, User } from '../domain';
import { createAction } from '../../shared/actions';

export enum UserActionTypes {
  LOGIN_INPROGRESS = 'LOGIN_INPROGRESS',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
  SIGNUP_INPROGRESS = 'SIGNUP_INPROGRESS',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_ERROR = 'SIGNUP_ERROR',
}

interface ILoginInProgressAction {
  readonly type: UserActionTypes.LOGIN_INPROGRESS;
}

interface ILoginSuccessAction {
  readonly type: UserActionTypes.LOGIN_SUCCESS;
  readonly payload: {
    readonly user: User;
  };
}

interface ILoginErrorAction {
  readonly type: UserActionTypes.LOGIN_ERROR;
  readonly payload: {
    readonly error: Error;
  };
}

interface ISignUpInProgressAction {
  readonly type: UserActionTypes.SIGNUP_INPROGRESS;
}

interface ISignUpSuccessAction extends Action {
  readonly type: UserActionTypes.SIGNUP_SUCCESS;
  readonly payload: {
    readonly user: User;
  };
}

interface ISignUpErrorAction extends Action {
  readonly type: UserActionTypes.SIGNUP_ERROR;
  readonly payload: {
    readonly error: Error;
  };
}

export type UserActions =
  | ILoginInProgressAction
  | ILoginSuccessAction
  | ILoginErrorAction
  | ISignUpInProgressAction
  | ISignUpSuccessAction
  | ISignUpErrorAction;

export const login = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(UserActionTypes.LOGIN_INPROGRESS));
    try {
      const user = await UserService.login(username, password);
      return dispatch(createAction(UserActionTypes.LOGIN_SUCCESS, { user }));
    } catch (e) {
      return dispatch(createAction(UserActionTypes.LOGIN_ERROR, { error: e }));
    }
  };
};

export const register = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(UserActionTypes.SIGNUP_INPROGRESS));
    try {
      const user = await UserService.register(username, password);
      return dispatch(createAction(UserActionTypes.SIGNUP_SUCCESS, { user }));
    } catch (e) {
      return dispatch(createAction(UserActionTypes.SIGNUP_ERROR, { error: e }));
    }
  };
};
