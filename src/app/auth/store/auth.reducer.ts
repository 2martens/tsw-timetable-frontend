import {ANONYMOUS_USER, User} from "../model/user";
import {createReducer, on} from "@ngrx/store";
import {loggedInAction, loggedInFinishedAction, loggedOutAction} from "./auth.actions";

export interface AuthState {
  user: User;
  loggedIn: boolean;
  needsUserData: boolean;
}

export const initialState: AuthState = {
  loggedIn: false,
  user: ANONYMOUS_USER,
  needsUserData: false
}

export const authReducer = createReducer(
  initialState,
  on(loggedInAction, (state, _) => {
    if (state.loggedIn && !state.needsUserData) {
      return {...state};
    }

    return {
      ...state,
      needsUserData: true,
      loggedIn: true,
    }
  }),
  on(loggedInFinishedAction, (state, action) => {
    return {
      ...state,
      user: action.user,
      needsUserData: false,
    }
  }),
  on(loggedOutAction, (state, _) => {
    return {
      ...state,
      user: ANONYMOUS_USER,
      loggedIn: false
    }
  })
);
