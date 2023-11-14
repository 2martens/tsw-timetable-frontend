import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadAllFormationsAction, loadAllFormationsFinishedAction} from "./formations.actions";
import {map, switchMap} from "rxjs";
import {FormationsService} from "../formations.service";

@Injectable()
export class FormationsEffects {
  loadAllFormations$ = createEffect(
    (actions$ = inject(Actions), formationsService = inject(FormationsService)) => {
      return actions$.pipe(
        ofType(loadAllFormationsAction),
        switchMap(() => formationsService.fetchFormations()),
        map(formations => loadAllFormationsFinishedAction({payload: formations}))
      )
    },
    {functional: true});
}
