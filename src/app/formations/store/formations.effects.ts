import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {addFormationAction, deleteFormationAction, updateFormationAction} from "./formations.actions";
import {combineLatestWith, map, switchMap} from "rxjs";
import {FormationsService} from "../service/formations.service";
import {AuthService} from "../../auth/service/auth.service";

export const storeFormation = createEffect((
    actions$ = inject(Actions),
    formationsService = inject(FormationsService),
    authService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(addFormationAction, updateFormationAction),
      map(action => action.payload),
      combineLatestWith(authService.getUser$()),
      switchMap(([formation, user]) => formationsService.storeFormation(formation, user.id))
    );
  },
  {functional: true, dispatch: false});

export const deleteFormation = createEffect((
    actions$ = inject(Actions),
    formationsService = inject(FormationsService),
    authService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(deleteFormationAction),
      map(action => action.payload),
      combineLatestWith(authService.getUser$()),
      switchMap(([formation, user]) => formationsService.deleteFormation(formation, user.id))
    );
  },
  {functional: true, dispatch: false});
