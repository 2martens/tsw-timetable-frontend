import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {RouteService} from "../service/route.service";
import {addRouteAction, deleteRouteAction, updateRouteAction} from "./routes.actions";
import {map, switchMap} from "rxjs";

export const storeRoute = createEffect((
    actions$ = inject(Actions),
    routesService = inject(RouteService)
  ) => {
    return actions$.pipe(
      ofType(addRouteAction, updateRouteAction),
      map(action => action.payload),
      switchMap((route) => routesService.storeRoute(route))
    );
  },
  {functional: true, dispatch: false});

export const deleteRoute = createEffect((
    actions$ = inject(Actions),
    routesService = inject(RouteService)
  ) => {
    return actions$.pipe(
      ofType(deleteRouteAction),
      map(action => action.payload),
      switchMap((route) => routesService.deleteRoute(route))
    );
  },
  {functional: true, dispatch: false});
