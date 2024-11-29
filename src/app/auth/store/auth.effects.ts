import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {map, switchMap} from "rxjs";
import {KeycloakService} from "keycloak-angular";
import {loggedInFinishedAction, loggedOutAction, logInAction, logOutAction} from "./auth.actions";
import {UserService} from "../service/user.service";

export const logIn = createEffect((
    actions$ = inject(Actions),
    keycloakService = inject(KeycloakService)
  ) => {
    return actions$.pipe(
      ofType(logInAction),
      map(action => action.redirectUrl),
      switchMap((redirectUri) => keycloakService.login({redirectUri})),
    );
  },
  {functional: true, dispatch: false});

export const storeUser = createEffect((
    actions$ = inject(Actions),
    userService = inject(UserService)
  ) => {
    return actions$.pipe(
      ofType(loggedInFinishedAction),
      map(action => action.user),
      switchMap((user) => userService.storeUser(user))
    )
  },
  {functional: true, dispatch: false})

export const logOut = createEffect((
    actions$ = inject(Actions),
    keycloakService = inject(KeycloakService)
  ) => {
    return actions$.pipe(
      ofType(logOutAction),
      map(action => action.redirectUrl),
      switchMap(redirectUri => keycloakService.logout(redirectUri)),
      map(() => loggedOutAction())
    );
  },
  {functional: true});
