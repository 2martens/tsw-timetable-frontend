import {Route} from "../model/route";
import {createReducer, on} from "@ngrx/store";
import {
  addRouteAction,
  deleteRouteAction,
  loadAllRoutesCancelledAction,
  loadAllRoutesFinishedAction,
  loadAllStationsCancelledAction,
  loadAllStationsFinishedAction,
  loadSingleRouteFinishedAction,
  updateRouteAction
} from "./routes.actions";
import {Country} from "../model/country";
import {Station} from "../model/station";

export interface RoutesState {
  needRoutes: boolean;
  routes: Route[];
  countries: Country[];
  needStations: boolean;
  stations: Station[];
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
  needStations: true,
  stations: []
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
  on(loadAllStationsFinishedAction, (state,
                                     action) => ({
    ...state,
    stations: [...action.payload]
  })),
  on(loadAllStationsFinishedAction, loadAllStationsCancelledAction, (state, _) => ({
    ...state,
    needStations: false
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
