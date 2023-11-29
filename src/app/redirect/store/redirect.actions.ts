import {createAction, props} from "@ngrx/store";

export enum ActionTypes {
  Redirect = '[Redirect] Redirect',
}

export const redirectAction = createAction(
  ActionTypes.Redirect,
  props<{ redirectURL: string }>()
);
