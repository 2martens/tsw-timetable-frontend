import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {subscribeAction} from "./subscription.actions";
import {map, switchMap, withLatestFrom} from "rxjs";
import {PricingService} from "../pricing/service/pricing.service";
import {AuthService} from "../../auth/service/auth.service";
import {redirectAction} from "../../redirect/store/redirect.actions";

export const subscribe = createEffect((
    actions$: Actions = inject(Actions),
    pricingService: PricingService = inject(PricingService),
    authService: AuthService = inject(AuthService),
  ) => {
    return actions$.pipe(
      ofType(subscribeAction),
      map((action) => action.lookupKey),
      withLatestFrom(authService.getUser$()),
      switchMap(([lookupKey, user]) => pricingService.subscribe$(user, lookupKey)),
      map(redirectURL => redirectAction({redirectURL}))
    )
  },
  {functional: true});
