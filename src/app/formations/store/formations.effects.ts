import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {addFormationAction, deleteFormationAction, updateFormationAction} from "./formations.actions";
import {map, switchMap} from "rxjs";
import {FormationsService} from "../service/formations.service";

export const storeFormation = createEffect((
    actions$ = inject(Actions),
    formationsService = inject(FormationsService)
  ) => {
    return actions$.pipe(
      ofType(addFormationAction, updateFormationAction),
      map(action => action.payload),
      switchMap((formation) => formationsService.storeFormation(formation))
    );
  },
  {functional: true, dispatch: false});

export const deleteFormation = createEffect((
    actions$ = inject(Actions),
    formationsService = inject(FormationsService)
  ) => {
    return actions$.pipe(
      ofType(deleteFormationAction),
      map(action => action.payload),
      switchMap((formation) => formationsService.deleteFormation(formation))
    );
  },
  {functional: true, dispatch: false});
