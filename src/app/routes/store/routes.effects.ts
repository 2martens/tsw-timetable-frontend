import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {RouteService} from "../service/route.service";
import {addRouteAction, deleteRouteAction, updateRouteAction} from "./routes.actions";
import {combineLatestWith, map, switchMap} from "rxjs";
import {AuthService} from "../../auth/service/auth.service";

export const storeRoute = createEffect((
    actions$ = inject(Actions),
    routesService = inject(RouteService),
    authService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(addRouteAction, updateRouteAction),
      map(action => action.payload),
      combineLatestWith(authService.getUser$()),
      switchMap(([route, user]) => routesService.storeRoute(route, user.id))
    );
  },
  {functional: true, dispatch: false});

export const deleteRoute = createEffect((
    actions$ = inject(Actions),
    routesService = inject(RouteService),
    authService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(deleteRouteAction),
      map(action => action.payload),
      combineLatestWith(authService.getUser$()),
      switchMap(([route, user]) => routesService.deleteRoute(route, user.id))
    );
  },
  {functional: true, dispatch: false});
