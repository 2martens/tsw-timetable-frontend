import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {RouteService} from "./route.service";
import {RoutesState} from "../store/routes.reducer";
import {filter, finalize, Observable, share, switchMap, tap, using} from "rxjs";
import {allRoutes, allStations, needRoutes, needStations} from "../store";
import {
  loadAllRoutesAction,
  loadAllRoutesCancelledAction,
  loadAllRoutesFinishedAction,
  loadAllStationsAction,
  loadAllStationsCancelledAction,
  loadAllStationsFinishedAction
} from "../store/routes.actions";
import {Route} from "../model/route";
import {Station} from "../model/station";
import {StationService} from "./station.service";

@Injectable({
  providedIn: 'root'
})
export class RoutesStoreService {

  constructor(private readonly routeService: RouteService,
              private readonly stationService: StationService,
              private readonly store: Store<RoutesState>) {
  }

  getRoutes$() {
    return using(
      () => this.loadRoutes$().subscribe(),
      () => this.store.select(allRoutes())
    )
  }

  private loadRoutes$(): Observable<Route[]> {
    return this.store.select(needRoutes()).pipe(
      filter(needRoutes => needRoutes),
      tap(() => this.store.dispatch(loadAllRoutesAction())),
      switchMap(() => this.routeService.fetchRoutes()),
      tap((routes) => this.store.dispatch(loadAllRoutesFinishedAction({payload: routes}))),
      finalize(() => this.store.dispatch(loadAllRoutesCancelledAction())),
      share()
    );
  }

  getStations$() {
    return using(
      () => this.loadStations$().subscribe(),
      () => this.store.select(allStations())
    )
  }

  private loadStations$(): Observable<Station[]> {
    return this.store.select(needStations()).pipe(
      filter(needStations => needStations),
      tap(() => this.store.dispatch(loadAllStationsAction())),
      switchMap(() => this.stationService.fetchStations()),
      tap((stations) => this.store.dispatch(loadAllStationsFinishedAction({payload: stations}))),
      finalize(() => this.store.dispatch(loadAllStationsCancelledAction())),
      share()
    );
  }
}
