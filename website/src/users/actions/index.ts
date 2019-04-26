import { Action, Dispatch } from 'redux';

import { UserService, User } from '../domain';
import { createAction } from '../../shared/actions';

export const types = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  REGISTER: 'REGISTER',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_ERROR: 'REGISTER_ERROR',
};

interface ILoginAction extends Action {
  type: 'LOGIN';
}

interface ILoginSuccessAction extends Action {
  type: 'LOGIN_SUCCESS';
  user: User;
}

interface ILoginErrorAction extends Action {
  type: 'LOGIN_ERROR';
  errorMessage: string;
}

interface IRegisterAction extends Action {
  type: 'REGISTER';
}

interface IRegisterSuccessAction extends Action {
  type: 'REGISTER_SUCCESS';
  user: User;
}

interface IRegisterErrorAction extends Action {
  type: 'REGISTER_ERROR';
  errorMessage: string;
}

export type UserActions =
  | ILoginAction
  | ILoginSuccessAction
  | ILoginErrorAction
  | IRegisterAction
  | IRegisterSuccessAction
  | IRegisterErrorAction;

export const login = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(types.LOGIN));
    try {
      await UserService.login(username, password);
      return dispatch(createAction(types.LOGIN_SUCCESS));
    } catch (e) {
      return dispatch(createAction(types.LOGIN_ERROR, null, e));
    }
  };
};

export const register = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAction(types.REGISTER));
    try {
      const user = await UserService.register(username, password);
      return dispatch(createAction(types.REGISTER_SUCCESS, user));
    } catch (e) {
      return dispatch(createAction(types.REGISTER_ERROR, null, e));
    }
  };
};
