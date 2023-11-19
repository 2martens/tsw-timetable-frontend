import {createAction, props} from "@ngrx/store";

export enum ActionTypes {
  Subscribed = '[Pricing] Subscribed',
}

export const subscribedAction = createAction(
  ActionTypes.Subscribed,
  props<{ lookupKey: string }>()
);
