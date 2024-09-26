import {DEFAULT_TIMETABLE, Timetable} from "../model/timetable";
import {Route} from "../../routes/model/route";
import {Store} from "@ngrx/store";
import {inject} from "@angular/core";
import {TimetablesState} from "../store/timetables.reducer";
import {RoutesStoreService} from "../../routes/service/routes-store.service";

export class TimetableComponent {
  timetable: Timetable = {...DEFAULT_TIMETABLE};

  protected readonly store: Store<TimetablesState> = inject(Store<TimetablesState>);
  private readonly routesStoreService: RoutesStoreService = inject(RoutesStoreService);
  readonly routes$ = this.routesStoreService.getRoutes$();

  compareWithRoute(route1: Route, route2: Route) {
    return route1 && route2 ? route1.id === route2.id : route1 === route2;
  }
}
