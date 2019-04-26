import { UserActions } from '../actions';
import { User } from '../domain';

export type UserState = {
  loggedInUser: User | null;
};

export const createDefaultUserState = () => {
  return {
    loggedInUser: null,
  };
};

export const userReducer = (state: UserState, action: UserActions): UserState => {
  if (action.type === 'LOGIN_SUCCESS' || action.type === 'REGISTER_SUCCESS') {
    return {
      loggedInUser: action.user,
    };
  }

  return state;
};
