import { UserActions, UserActionTypes } from '../actions';
import { User } from '../domain';

export interface IUserState {
  loggedInUser: User | null;
}

export const createDefaultUserState = () => {
  return {
    loggedInUser: null,
  };
};

export const userReducer = (state: IUserState, action: UserActions): IUserState => {
  if (action.type === UserActionTypes.LOGIN_SUCCESS || action.type === UserActionTypes.SIGNUP_SUCCESS) {
    return {
      loggedInUser: action.payload.user,
    };
  }

  return state;
};
