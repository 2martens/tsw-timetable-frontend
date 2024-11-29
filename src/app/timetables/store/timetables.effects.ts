import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {combineLatestWith, map, switchMap} from "rxjs";
import {
  addTimetableAction,
  deleteTimetableAction,
  updateTimetableAction,
  updateTimetableFromBackendAction
} from "./timetables.actions";
import {TimetableService} from "../service/timetable.service";
import {AuthService} from "../../auth/service/auth.service";

export const storeTimetable = createEffect((
    actions$ = inject(Actions),
    timetableService = inject(TimetableService),
    authService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(addTimetableAction, updateTimetableAction),
      map(action => action.payload),
      combineLatestWith(authService.getUser$()),
      switchMap(([timetable, user]) => timetableService.storeTimetable(timetable, user.id)),
      map(timetable => updateTimetableFromBackendAction({payload: timetable}))
    );
  },
  {functional: true});

export const deleteTimetable = createEffect((
    actions$ = inject(Actions),
    timetableService = inject(TimetableService),
    authService = inject(AuthService)
  ) => {
    return actions$.pipe(
      ofType(deleteTimetableAction),
      map(action => action.payload),
      combineLatestWith(authService.getUser$()),
      switchMap(([timetable, user]) => timetableService.deleteTimetable(timetable, user.id))
    );
  },
  {functional: true, dispatch: false});
