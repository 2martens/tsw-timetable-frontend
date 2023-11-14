import {DEFAULT_FORMATION, Formation} from "../model/formation";
import {createReducer, on} from "@ngrx/store";
import {loadAllFormationsFinishedAction, loadSingleFormationFinishedAction} from "./formations.actions";

export interface ReducerFormationsState {
  items: Formation[];
  selectedItem: Formation;
}

export const initialState: ReducerFormationsState = {
  items: [],
  selectedItem: DEFAULT_FORMATION,
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
);
