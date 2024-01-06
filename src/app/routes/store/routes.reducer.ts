import {Route} from "../model/route";
import {createReducer, on} from "@ngrx/store";
import {
  addRouteAction,
  deleteRouteAction,
  loadAllRoutesCancelledAction,
  loadAllRoutesFinishedAction,
  loadSingleRouteFinishedAction,
  updateRouteAction
} from "./routes.actions";
import {Country} from "../model/country";

export interface RoutesState {
  needRoutes: boolean;
  routes: Route[];
  countries: Country[];
}

export const initialState: RoutesState = {
  needRoutes: true,
  routes: [],
  countries: [
    {
      code: 'de',
      name: $localize`Germany`
    }
  ],
};

export const routesReducer = createReducer(
  initialState,
  on(loadAllRoutesFinishedAction, (state,
                                   action) => ({
    ...state,
    routes: [...action.payload]
  })),
  on(loadSingleRouteFinishedAction, (state,
                                     action) => ({
    ...state,
    selectedItem: action.payload
  })),
  on(loadAllRoutesFinishedAction, loadAllRoutesCancelledAction, (state, _) => ({
    ...state,
    needRoutes: false
  })),
  on(addRouteAction, (state, action) => ({
    ...state,
    routes: [...state.routes, action.payload]
  })),
  on(updateRouteAction, (state, action) => ({
    ...state,
    routes: state.routes.map((oldRoute) => {
      if (oldRoute.id == action.payload.id) {
        return action.payload;
      } else {
        return oldRoute;
      }
    })
  })),
  on(deleteRouteAction, (state, action) => ({
    ...state,
    routes: state.routes.filter((route) => {
      return route.id != action.payload.id
    })
  }))
);
