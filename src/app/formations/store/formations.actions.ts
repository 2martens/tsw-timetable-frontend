import {createAction, props} from "@ngrx/store";
import {Formation} from "../model/formation";

export enum ActionTypes {
  LoadAllFormations = '[Formations] Load All Formations',
  LoadAllFormationsFinished = '[Formations] Load All Formations Finished',

  LoadSingleFormation = '[Formations] Load Single Formation',
  LoadSingleFormationFinished = '[Formations] Load Single Formation Finished',

  AddFormation = '[Formations] Add Formation',
  UpdateFormation = '[Formations] Update Formation',
  DeleteFormation = '[Formations] Delete Formation',
}

export const loadAllFormationsAction = createAction(
  ActionTypes.LoadAllFormations
);

export const loadAllFormationsFinishedAction = createAction(
  ActionTypes.LoadAllFormationsFinished,
  props<{ payload: Formation[] }>()
);

export const loadSingleFormationAction = createAction(
  ActionTypes.LoadSingleFormation,
  props<{ payload: string }>()
);

export const loadSingleFormationFinishedAction = createAction(
  ActionTypes.LoadSingleFormationFinished,
  props<{ payload: Formation }>()
);

export const addFormationAction = createAction(
  ActionTypes.AddFormation,
  props<{ payload: Formation }>()
);

export const updateFormationAction = createAction(
  ActionTypes.UpdateFormation,
  props<{ payload: Formation }>()
);

export const deleteFormation = createAction(
  ActionTypes.DeleteFormation,
  props<{ payload: Formation }>()
);
