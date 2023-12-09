import {Timetable} from "../model/timetable";
import {createReducer, on} from "@ngrx/store";
import {
  addTimetableAction,
  deleteTimetableAction,
  loadAllTimetablesCancelledAction,
  loadAllTimetablesFinishedAction
} from "./timetables.actions";

export interface TimetablesState {
  needTimetables: boolean;
  timetables: Timetable[];
}

export const initialState: TimetablesState = {
  needTimetables: true,
  timetables: []
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
  on(addTimetableAction, (state, action) => ({
    ...state,
    timetables: [...state.timetables, action.payload]
  })),
  on(deleteTimetableAction, (state, action) => ({
    ...state,
    timetables: state.timetables.filter((timetable) => {
      return timetable.id != action.payload.id
    })
  }))
);
