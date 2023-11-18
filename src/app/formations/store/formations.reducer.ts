import {Formation} from "../model/formation";
import {createReducer, on} from "@ngrx/store";
import {
  addFormationAction,
  deleteFormationAction,
  loadAllFormationsCancelledAction,
  loadAllFormationsFinishedAction,
  loadSingleFormationFinishedAction,
  updateFormationAction
} from "./formations.actions";

export interface ReducerFormationsState {
  needFormations: boolean;
  items: Formation[];
}

export const initialState: ReducerFormationsState = {
  needFormations: true,
  items: [],
};

export const formationsReducer = createReducer(
  initialState,
  on(loadAllFormationsFinishedAction, (state,
                                       action) => ({
    ...state,
    items: [...action.payload]
  })),
  on(loadSingleFormationFinishedAction, (state,
                                         action) => ({
    ...state,
    selectedItem: action.payload
  })),
  on(loadAllFormationsFinishedAction, loadAllFormationsCancelledAction, (state, action) => ({
    ...state,
    needFormations: false
  })),
  on(addFormationAction, (state, action) => ({
    ...state,
    items: [...state.items, action.payload]
  })),
  on(updateFormationAction, (state, action) => ({
    ...state,
    items: state.items.map((oldFormation) => {
      if (oldFormation.id == action.payload.id) {
        return action.payload;
      } else {
        const referenceChanged = oldFormation.trainSimWorldFormation !== undefined
          && oldFormation.trainSimWorldFormation.id == action.payload.id;

        return {
          ...oldFormation,
          trainSimWorldFormation: referenceChanged ? action.payload : undefined
        };
      }
    })
  })),
  on(deleteFormationAction, (state, action) => ({
    ...state,
    items: state.items.filter((formation) => {
      return formation.id != action.payload.id
    }).map((formation) => {
      const referenceRemoved = formation.trainSimWorldFormation !== undefined
        && formation.trainSimWorldFormation.id == action.payload.id;
      return {
        ...formation,
        trainSimWorldFormation: referenceRemoved ? undefined : formation.trainSimWorldFormation
      };
    })
  }))
);
