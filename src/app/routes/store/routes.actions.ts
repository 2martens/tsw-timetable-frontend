import {createAction, props} from "@ngrx/store";
import {Route} from "../model/route";
import {Station} from "../model/station";

export enum ActionTypes {
  LoadAllRoutes = '[Routes] Load All Routes',
  LoadAllRoutesFinished = '[Routes] Load All Routes Finished',
  LoadAllRoutesCancelled = '[Routes] Load All Routes Cancelled',

  LoadAllStations = '[Routes] Load All Stations',
  LoadAllStationsFinished = '[Routes] Load All Stations Finished',
  LoadAllStationsCancelled = '[Routes] Load All Stations Cancelled',

  LoadSingleRoute = '[Routes] Load Single Route',
  LoadSingleRouteFinished = '[Routes] Load Single Route Finished',

  AddRoute = '[Routes] Add Route',
  UpdateRoute = '[Routes] Update Route',
  DeleteRoute = '[Routes] Delete Route',
}

export const loadAllRoutesAction = createAction(
  ActionTypes.LoadAllRoutes
);

export const loadAllRoutesFinishedAction = createAction(
  ActionTypes.LoadAllRoutesFinished,
  props<{ payload: Route[] }>()
);

export const loadAllRoutesCancelledAction = createAction(
  ActionTypes.LoadAllRoutesCancelled
);

export const loadSingleRouteAction = createAction(
  ActionTypes.LoadSingleRoute,
  props<{ payload: string }>()
);

export const loadSingleRouteFinishedAction = createAction(
  ActionTypes.LoadSingleRouteFinished,
  props<{ payload: Route }>()
);

export const addRouteAction = createAction(
  ActionTypes.AddRoute,
  props<{ payload: Route }>()
);

export const updateRouteAction = createAction(
  ActionTypes.UpdateRoute,
  props<{ payload: Route }>()
);

export const deleteRouteAction = createAction(
  ActionTypes.DeleteRoute,
  props<{ payload: Route }>()
);

export const loadAllStationsAction = createAction(
  ActionTypes.LoadAllStations
);

export const loadAllStationsFinishedAction = createAction(
  ActionTypes.LoadAllStationsFinished,
  props<{ payload: Station[] }>()
);

export const loadAllStationsCancelledAction = createAction(
  ActionTypes.LoadAllStationsCancelled
);
