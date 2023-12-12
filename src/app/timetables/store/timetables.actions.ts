import {createAction, props} from "@ngrx/store";
import {Timetable} from "../model/timetable";
import {Service} from "../model/service";
import {Rotation} from "../model/rotation";

export enum ActionTypes {
  LoadAllTimetables = '[Timetables] Load All Timetables',
  LoadAllTimetablesFinished = '[Timetables] Load All Timetables Finished',
  LoadAllTimetablesCancelled = '[Timetables] Load All Timetables Cancelled',

  LoadAllRotations = '[Timetables] Load All Rotations',
  LoadAllRotationsFinished = '[Timetables] Load All Rotations Finished',
  LoadAllRotationsCancelled = '[Timetables] Load All Rotations Cancelled',

  LoadAllServices = '[Timetables] Load All Services',
  LoadAllServicesFinished = '[Timetables] Load All Services Finished',
  LoadAllServicesCancelled = '[Timetables] Load All Services Cancelled',

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

export const loadAllRotationsAction = createAction(
  ActionTypes.LoadAllRotations
);

export const loadAllRotationsFinishedAction = createAction(
  ActionTypes.LoadAllRotationsFinished,
  props<{ timetable: Timetable, rotations: Rotation[] }>()
);

export const loadAllRotationsCancelledAction = createAction(
  ActionTypes.LoadAllRotationsCancelled
);

export const loadAllServicesAction = createAction(
  ActionTypes.LoadAllServices
);

export const loadAllServicesFinishedAction = createAction(
  ActionTypes.LoadAllServicesFinished,
  props<{ timetable: Timetable, services: Service[] }>()
);

export const loadAllServicesCancelledAction = createAction(
  ActionTypes.LoadAllServicesCancelled
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
