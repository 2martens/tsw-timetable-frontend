import {Injectable} from '@angular/core';
import {TimetablesState} from "../store/timetables.reducer";
import {Store} from "@ngrx/store";
import {TimetableService} from "./timetable.service";
import {combineLatestWith, filter, finalize, Observable, share, switchMap, tap, using} from "rxjs";
import {allTimetables, needTimetables} from "../store";
import {
  loadAllTimetablesAction,
  loadAllTimetablesCancelledAction,
  loadAllTimetablesFinishedAction
} from "../store/timetables.actions";
import {Timetable} from "../model/timetable";
import {AuthService} from "../../auth/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TimetableStoreService {

  constructor(private readonly timetableService: TimetableService,
              private readonly store: Store<TimetablesState>,
              private readonly authService: AuthService) {
  }

  getTimetables$() {
    return using(
      () => this.loadTimetables$().subscribe(),
      () => this.store.select(allTimetables())
    )
  }

  private loadTimetables$(): Observable<Timetable[]> {
    return this.store.select(needTimetables()).pipe(
      filter(needTimetables => needTimetables),
      tap(() => this.store.dispatch(loadAllTimetablesAction())),
      combineLatestWith(this.authService.getUser$()),
      switchMap(([_, user]) => this.timetableService.fetchTimetables(user.id)),
      tap((timetables) =>
        this.store.dispatch(loadAllTimetablesFinishedAction({payload: timetables}))),
      finalize(() => this.store.dispatch(loadAllTimetablesCancelledAction())),
      share()
    );
  }
}
