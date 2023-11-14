import {formationsReducer, ReducerFormationsState} from "./formations.reducer";
import {ActionReducerMap, createFeatureSelector, createSelector} from "@ngrx/store";

export const featureStateName = 'formationsFeature';

export interface FormationsState {
  formations: ReducerFormationsState;
}

export const formationsReducers: ActionReducerMap<FormationsState> = {
  formations: formationsReducer,
};

// extract the main property 'formationsFeature' from the state object
export const getFormationsFeatureState = createFeatureSelector<FormationsState>(
  featureStateName
);

export const allFormations = () => createSelector(
  getFormationsFeatureState,
  (state: FormationsState) => state.formations.items
);

export const selectedFormation = () => createSelector(
  getFormationsFeatureState,
  (state: FormationsState) =>
    state.formations.selectedItem
);
