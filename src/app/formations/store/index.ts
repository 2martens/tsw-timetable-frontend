import {formationsReducer, ReducerFormationsState} from "./formations.reducer";
import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";
import {FunctionalEffect} from "@ngrx/effects";
import {deleteFormation, storeFormation} from "./formations.effects";

export const featureStateName = 'formationsFeature';

export interface FormationsState {
  formations: ReducerFormationsState;
}

export const formationsReducers: ActionReducerMap<FormationsState> = {
  formations: formationsReducer,
};

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
  (state: FormationsState) => state.formations.needFormations
);

export const allFormations = () => createSelector(
  getFormationsFeatureState,
  (state: FormationsState) => state.formations.items
);

