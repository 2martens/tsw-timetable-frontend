import {createAction, props} from "@ngrx/store";

export enum ActionTypes {
  Subscribe = '[Subscription] Subscribe',
}

export const subscribeAction = createAction(
  ActionTypes.Subscribe,
  props<{ lookupKey: string }>()
);
