import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {redirectAction} from "./redirect.actions";
import {map, switchMap} from "rxjs";
import {Router} from "@angular/router";

export const redirect = createEffect((
    actions$: Actions = inject(Actions),
    router: Router = inject(Router),
  ) => {
    return actions$.pipe(
      ofType(redirectAction),
      map(action => action.redirectURL),
      switchMap((redirectURL) => {
        if (redirectURL.startsWith("http")) {
          return new Promise<boolean>((resolve, reject) => {
            try {
              resolve(!!window.open(redirectURL))
            } catch (e) {
              reject(e);
            }
          })
        } else {
          return router.navigateByUrl(redirectURL);
        }
      })
    )
  },
  {functional: true, dispatch: false})
