import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {map, switchMap} from "rxjs";
import {addTimetableAction, deleteTimetableAction, updateTimetableAction} from "./timetables.actions";
import {TimetableService} from "../service/timetable.service";

export const storeTimetable = createEffect((
    actions$ = inject(Actions),
    timetableService = inject(TimetableService)
  ) => {
    return actions$.pipe(
      ofType(addTimetableAction, updateTimetableAction),
      map(action => action.payload),
      switchMap((timetable) => timetableService.storeTimetable(timetable))
    );
  },
  {functional: true, dispatch: false});

export const deleteTimetable = createEffect((
    actions$ = inject(Actions),
    timetableService = inject(TimetableService)
  ) => {
    return actions$.pipe(
      ofType(deleteTimetableAction),
      map(action => action.payload),
      switchMap((timetable) => timetableService.deleteTimetable(timetable))
    );
  },
  {functional: true, dispatch: false});
