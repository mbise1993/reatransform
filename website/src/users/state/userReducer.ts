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

const loginOrSignUpSuccess = (state: UserState, user: User) => {
  return {
    loggedInUser: user,
    isInProgress: false,
    error: undefined,
  };
};

const callInProgress = (state: UserState) => {
  return {
    ...state,
    isInProgress: true,
  };
};

const callFailed = (state: UserState, error: Error) => {
  return {
    ...state,
    isInProgress: false,
    error: error,
  };
};

export const userReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.LOGIN_SUCCESS:
    case UserActionTypes.SIGN_UP_SUCCESS:
      return loginOrSignUpSuccess(state, action.payload.user);
    case UserActionTypes.CALL_INPROGRESS:
      return callInProgress(state);
    case UserActionTypes.CALL_FAILED:
      return callFailed(state, action.payload.error);
    default:
      return state;
  }
};
