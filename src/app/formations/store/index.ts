import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FunctionalEffect} from "@ngrx/effects";
import {deleteFormation, storeFormation} from "./formations.effects";
import {FormationsState} from "./formations.reducer";

export const featureStateName = 'formations';

export const formationsEffects: Record<string, FunctionalEffect> = {
  storeFormation: storeFormation,
  deleteFormation: deleteFormation
}

// extract the main property 'formationsFeature' from the state object
export const getFormationsFeatureState = createFeatureSelector<FormationsState>(
  featureStateName
);

export const needFormations = () => createSelector(
  getFormationsFeatureState,
  (state: FormationsState) => state.needFormations
);

export const allFormations = () => createSelector(
  getFormationsFeatureState,
  (state: FormationsState) => state.items
);

