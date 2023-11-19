import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {subscribedAction} from "./pricing.actions";
import {map, tap} from "rxjs";

export const subscribe = createEffect(
  (actions$ = inject(Actions)
  ) => {
    return actions$.pipe(
      ofType(subscribedAction),
      map((action) => action.lookupKey),
      tap((lookupKey) => console.debug("Subscribed price with lookup key: " + lookupKey))
    )
  },
  {functional: true, dispatch: false});
