import {createAction, props} from "@ngrx/store";
import {User} from "../model/user";

export enum ActionTypes {
  Register = '[Auth] Register',
  LogIn = '[Auth] LogIn',
  LoggedIn = '[Auth] LoggedIn',
  LoggedInFinished = '[Auth] LoggedIn Finished',
  LogOut = '[Auth] LogOut',
  LoggedOut = '[Auth] LoggedOut'
}

export const registerAction = createAction(ActionTypes.Register);

export const logInAction = createAction(
  ActionTypes.LogIn,
  props<{ redirectUrl: string }>()
);

export const loggedInAction = createAction(
  ActionTypes.LoggedIn,
);

export const loggedInFinishedAction = createAction(
  ActionTypes.LoggedInFinished,
  props<{ user: User }>()
);

export const logOutAction = createAction(
  ActionTypes.LogOut,
  props<{ redirectUrl: string }>()
);

export const loggedOutAction = createAction(ActionTypes.LoggedOut);
