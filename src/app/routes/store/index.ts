import {createFeatureSelector, createSelector} from "@ngrx/store";
import {RoutesState} from "./routes.reducer";
import {FunctionalEffect} from "@ngrx/effects";
import {deleteRoute, storeRoute} from "./routes.effects";

export const featureStateName = 'routes';

export const routesEffects: Record<string, FunctionalEffect> = {
  storeRoute: storeRoute,
  deleteRoute: deleteRoute
}

export const getRoutesFeatureState = createFeatureSelector<RoutesState>(
  featureStateName
);

export const needRoutes = () => createSelector(
  getRoutesFeatureState,
  (state: RoutesState) => state.needRoutes
);

export const allRoutes = () => createSelector(
  getRoutesFeatureState,
  (state: RoutesState) => state.routes
);

export const allCountries = () => createSelector(
  getRoutesFeatureState,
  (state: RoutesState) => state.countries
);

export const needStations = () => createSelector(
  getRoutesFeatureState,
  (state: RoutesState) => state.needStations
);

export const allStations = () => createSelector(
  getRoutesFeatureState,
  (state: RoutesState) => state.stations
);
