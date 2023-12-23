import {Injectable} from '@angular/core';
import {FormationsService} from "./formations.service";
import {Store} from "@ngrx/store";
import {allFormations, needFormations} from "../store";
import {combineLatestWith, filter, finalize, Observable, share, switchMap, tap, using} from "rxjs";
import {
  loadAllFormationsAction,
  loadAllFormationsCancelledAction,
  loadAllFormationsFinishedAction
} from "../store/formations.actions";
import {Formation} from "../model/formation";
import {FormationsState} from "../store/formations.reducer";
import {AuthService} from "../../auth/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class FormationsStoreService {
  private formations$: Observable<Formation[]>;

  constructor(
    private readonly formationsService: FormationsService,
    private readonly authService: AuthService,
    private readonly store: Store<FormationsState>
  ) {
    this.formations$ = this.loadFormations$();
  }

  getFormations$() {
    return using(
      () => this.formations$.subscribe(),
      () => this.store.select(allFormations())
    )
  }

  private loadFormations$(): Observable<Formation[]> {
    return this.store.select(needFormations()).pipe(
      filter(needFormations => needFormations),
      tap(() => this.store.dispatch(loadAllFormationsAction())),
      combineLatestWith(this.authService.getUser$()),
      switchMap(([_, user]) => this.formationsService.fetchFormations(user.id)),
      tap((formations) => this.store.dispatch(loadAllFormationsFinishedAction({payload: formations}))),
      finalize(() => this.store.dispatch(loadAllFormationsCancelledAction())),
      share()
    );
  }
}
