import {FunctionalEffect} from "@ngrx/effects";
import {deleteTimetable, storeTimetable} from "./timetables.effects";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TimetablesState} from "./timetables.reducer";

export const featureStateName = 'timetables';

export const timetablesEffects: Record<string, FunctionalEffect> = {
  storeTimetable: storeTimetable,
  deleteTimetable: deleteTimetable
}

export const getTimetablesFeatureState = createFeatureSelector<TimetablesState>(
  featureStateName
);

export const needTimetables = () => createSelector(
  getTimetablesFeatureState,
  (state: TimetablesState) => state.needTimetables
);

export const allTimetables = () => createSelector(
  getTimetablesFeatureState,
  (state: TimetablesState) => state.timetables
);
