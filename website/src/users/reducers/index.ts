import { UserActions, UserActionTypes } from '../actions';
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

export const userReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
    case UserActionTypes.SIGN_UP:
      return {
        loggedInUser: action.payload.user,
        isInProgress: false,
        error: undefined,
      };
    case UserActionTypes.IN_PROGRESS:
      return {
        ...state,
        isInProgress: true,
      };
    case UserActionTypes.ERROR:
      return {
        ...state,
        isInProgress: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
