import {createAction, props} from "@ngrx/store";
import {Timetable} from "../model/timetable";

export enum ActionTypes {
  LoadAllTimetables = '[Timetables] Load All Timetables',
  LoadAllTimetablesFinished = '[Timetables] Load All Timetables Finished',
  LoadAllTimetablesCancelled = '[Timetables] Load All Timetables Cancelled',

  AddTimetable = '[Timetables] Add Timetable',
  UpdateTimetable = '[Timetables] Update Timetable',
  DeleteTimetable = '[Timetables] Delete Timetable',
}

export const loadAllTimetablesAction = createAction(
  ActionTypes.LoadAllTimetables
);

export const loadAllTimetablesFinishedAction = createAction(
  ActionTypes.LoadAllTimetablesFinished,
  props<{ payload: Timetable[] }>()
);

export const loadAllTimetablesCancelledAction = createAction(
  ActionTypes.LoadAllTimetablesCancelled
);

export const addTimetableAction = createAction(
  ActionTypes.AddTimetable,
  props<{ payload: Timetable }>()
);

export const updateTimetableAction = createAction(
  ActionTypes.UpdateTimetable,
  props<{ payload: Timetable }>()
);

export const deleteTimetableAction = createAction(
  ActionTypes.DeleteTimetable,
  props<{ payload: Timetable }>()
);
