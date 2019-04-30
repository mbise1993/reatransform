import { UserActions, UserActionTypes } from '../actions';
import { User } from '../domain';

export interface IUserState {
  loggedInUser: User | null;
  isInProgress: boolean;
  error: Error | null;
}

export const createDefaultUserState = () => {
  return {
    loggedInUser: null,
    isInProgress: false,
    error: null,
  };
};

export const userReducer = (state: IUserState, action: UserActions): IUserState => {
  if (action.type === UserActionTypes.LOGIN || action.type === UserActionTypes.SIGN_UP) {
    return {
      loggedInUser: action.payload.user,
      isInProgress: false,
      error: null,
    };
  } else if (action.type === UserActionTypes.IN_PROGRESS) {
    return { ...state, isInProgress: true };
  } else if (action.type === UserActionTypes.ERROR) {
    return { ...state, isInProgress: false, error: action.payload.error };
  }

  return state;
};
