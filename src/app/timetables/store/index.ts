import {FunctionalEffect} from "@ngrx/effects";
import {deleteTimetable, storeTimetable} from "./timetables.effects";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TimetablesState} from "./timetables.reducer";
import {Timetable} from "../model/timetable";
import {Rotation} from "../model/rotation";

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

export const allRotations = (timetable: Timetable) => createSelector(
  getTimetablesFeatureState,
  (state: TimetablesState) => state.rotations[timetable.id]
);

export const allServices = (timetable: Timetable) => createSelector(
  getTimetablesFeatureState,
  (state: TimetablesState) => state.services[timetable.id]
);

export const servicesInRotation = (rotation: Rotation) => createSelector(
  getTimetablesFeatureState,
  (state: TimetablesState) => state.services[rotation.timetableId].filter(service => service.rotationId == rotation.id)
);
