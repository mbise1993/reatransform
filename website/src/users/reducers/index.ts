import { UserActions, UserActionTypes } from '../actions';
import { User } from '../domain';

export type UserState = {
  readonly loggedInUser: User | null;
  readonly isInProgress: boolean;
  readonly error: Error | null;
};

const initialState: UserState = {
  loggedInUser: null,
  isInProgress: false,
  error: null,
};

export const userReducer = (state = initialState, action: UserActions): UserState => {
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
