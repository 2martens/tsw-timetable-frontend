import {Timetable} from "../model/timetable";
import {createReducer, on} from "@ngrx/store";
import {
  addTimetableAction,
  deleteTimetableAction,
  loadAllRotationsCancelledAction,
  loadAllRotationsFinishedAction,
  loadAllServicesCancelledAction,
  loadAllServicesFinishedAction,
  loadAllTimetablesCancelledAction,
  loadAllTimetablesFinishedAction,
  updateTimetableAction,
  updateTimetableFromBackendAction
} from "./timetables.actions";
import {Service} from "../model/service";
import {Rotation} from "../model/rotation";

export interface TimetablesState {
  needTimetables: boolean;
  timetables: Timetable[];
  needRotations: boolean;
  rotations: { [name: string]: Rotation[] }
  needServices: boolean;
  services: { [name: string]: Service[] }
}

export const initialState: TimetablesState = {
  needTimetables: true,
  timetables: [],
  needRotations: true,
  rotations: {},
  needServices: true,
  services: {}
};

export const timetablesReducer = createReducer(
  initialState,
  on(loadAllTimetablesFinishedAction, (state,
                                       action) => ({
    ...state,
    timetables: [...action.payload]
  })),
  on(loadAllTimetablesFinishedAction, loadAllTimetablesCancelledAction, (state, _) => ({
    ...state,
    needTimetables: false
  })),
  on(loadAllRotationsFinishedAction, (state, action) => {
    const newRotations = {...state.rotations};
    newRotations[action.timetable.id] = action.rotations;
    return {
      ...state,
      rotations: newRotations
    }
  }),
  on(loadAllRotationsFinishedAction, loadAllRotationsCancelledAction, (state, _) => ({
    ...state,
    needRotations: false
  })),
  on(loadAllServicesFinishedAction, (state, action) => {
    const newServices = {...state.services};
    newServices[action.timetable.id] = action.services;
    return {
      ...state,
      services: newServices
    }
  }),
  on(loadAllServicesFinishedAction, loadAllServicesCancelledAction, (state, _) => ({
    ...state,
    needServices: false
  })),
  on(addTimetableAction, (state, action) => ({
    ...state,
    timetables: [...state.timetables, action.payload]
  })),
  on(updateTimetableAction, updateTimetableFromBackendAction, (state, action) => ({
    ...state,
    timetables: state.timetables.map((oldTimetable) => {
      if (oldTimetable.id == action.payload.id) {
        return action.payload;
      } else {
        return oldTimetable;
      }
    })
  })),
  on(deleteTimetableAction, (state, action) => ({
    ...state,
    timetables: state.timetables.filter((timetable) => {
      return timetable.id != action.payload.id
    })
  }))
);
