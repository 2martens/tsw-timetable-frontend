import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {RouteService} from "./route.service";
import {RoutesState} from "../store/routes.reducer";
import {combineLatestWith, filter, finalize, Observable, share, switchMap, tap, using} from "rxjs";
import {allRoutes, needRoutes} from "../store";
import {loadAllRoutesAction, loadAllRoutesCancelledAction, loadAllRoutesFinishedAction} from "../store/routes.actions";
import {Route} from "../model/route";
import {AuthService} from "../../auth/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoutesStoreService {

  private routes$: Observable<Route[]>;

  constructor(private readonly routeService: RouteService,
              private readonly authService: AuthService,
              private readonly store: Store<RoutesState>) {
    this.routes$ = this.loadRoutes$();
  }

  getRoutes$() {
    return using(
      () => this.routes$.subscribe(),
      () => this.store.select(allRoutes())
    )
  }

  private loadRoutes$(): Observable<Route[]> {
    return this.store.select(needRoutes()).pipe(
      filter(needRoutes => needRoutes),
      tap(() => this.store.dispatch(loadAllRoutesAction())),
      combineLatestWith(this.authService.getUser$()),
      switchMap(([_, user]) => this.routeService.fetchRoutes(user.id)),
      tap((routes) => this.store.dispatch(loadAllRoutesFinishedAction({payload: routes}))),
      finalize(() => this.store.dispatch(loadAllRoutesCancelledAction())),
      share()
    );
  }
}
