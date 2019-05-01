import { Dispatch } from 'redux';

import { UserService, User } from '../domain';
import { createAction } from '../../shared/state';

export enum UserActionTypes {
  LOGIN_SUCCESS = 'user/LOGIN_SUCCESS',
  SIGN_UP_SUCCESS = 'user/SIGN_UP_SUCCESS',
  CALL_INPROGRESS = 'user/CALL_INPROGRESS',
  CALL_FAILED = 'user/CALL_FAILED',
}

type LoginSuccessAction = {
  readonly type: UserActionTypes.LOGIN_SUCCESS;
  readonly payload: {
    readonly user: User;
  };
};

type SignUpSuccessAction = {
  readonly type: UserActionTypes.SIGN_UP_SUCCESS;
  readonly payload: {
    readonly user: User;
  };
};

type CallInProgressAction = {
  readonly type: UserActionTypes.CALL_INPROGRESS;
};

type CallFailedAction = {
  readonly type: UserActionTypes.CALL_FAILED;
  readonly payload: {
    readonly error: Error;
  };
};

export type UserActions = LoginSuccessAction | SignUpSuccessAction | CallInProgressAction | CallFailedAction;

export const login = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(UserActionTypes.CALL_INPROGRESS));
    try {
      const user = await UserService.login(username, password);
      return dispatch(createAction(UserActionTypes.LOGIN_SUCCESS, { user }));
    } catch (e) {
      return dispatch(createAction(UserActionTypes.CALL_FAILED, { error: e }));
    }
  };
};

export const signUp = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(UserActionTypes.CALL_INPROGRESS));
    try {
      const user = await UserService.register(username, password);
      return dispatch(createAction(UserActionTypes.SIGN_UP_SUCCESS, { user }));
    } catch (e) {
      return dispatch(createAction(UserActionTypes.CALL_FAILED, { error: e }));
    }
  };
};
