import {Timetable} from "../model/timetable";
import {createReducer, on} from "@ngrx/store";
import {loadAllTimetablesCancelledAction, loadAllTimetablesFinishedAction} from "./timetables.actions";

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
);
