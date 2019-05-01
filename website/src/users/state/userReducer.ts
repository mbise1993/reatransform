import { UserActions, UserActionTypes } from './userActions';
import { User } from '../domain';

export type UserState = {
  readonly loggedInUser: User | undefined;
  readonly isInProgress: boolean;
  readonly error: Error | undefined;
};

const initialState: UserState = {
  loggedInUser: undefined,
  isInProgress: false,
  error: undefined,
};

const loginOrSignUp = (state: UserState, user: User) => {
  return {
    loggedInUser: user,
    isInProgress: false,
    error: undefined,
  };
};

const inProgress = (state: UserState) => {
  return {
    ...state,
    isInProgress: true,
  };
};

const error = (state: UserState, error: Error) => {
  return {
    ...state,
    isInProgress: false,
    error: error,
  };
};

export const userReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
    case UserActionTypes.SIGN_UP:
      return loginOrSignUp(state, action.payload.user);
    case UserActionTypes.IN_PROGRESS:
      return inProgress(state);
    case UserActionTypes.ERROR:
      return error(state, action.payload.error);
    default:
      return state;
  }
};
