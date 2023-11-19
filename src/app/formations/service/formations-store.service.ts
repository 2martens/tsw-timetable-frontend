import {Injectable} from '@angular/core';
import {FormationsService} from "./formations.service";
import {Store} from "@ngrx/store";
import {allFormations, needFormations} from "../store";
import {filter, finalize, Observable, share, switchMap, tap, using} from "rxjs";
import {
  loadAllFormationsAction,
  loadAllFormationsCancelledAction,
  loadAllFormationsFinishedAction
} from "../store/formations.actions";
import {Formation} from "../model/formation";
import {FormationsState} from "../store/formations.reducer";

@Injectable({
  providedIn: 'root'
})
export class FormationsStoreService {
  constructor(
    private readonly formationsService: FormationsService,
    private readonly store: Store<FormationsState>
  ) {
  }

  getFormations$() {
    return using(
      () => this.loadFormations$().subscribe(),
      () => this.store.select(allFormations())
    )
  }

  private loadFormations$(): Observable<Formation[]> {
    return this.store.select(needFormations()).pipe(
      filter(needFormations => needFormations),
      tap(() => this.store.dispatch(loadAllFormationsAction())),
      switchMap(() => this.formationsService.fetchFormations()),
      tap((formations) => this.store.dispatch(loadAllFormationsFinishedAction({payload: formations}))),
      finalize(() => this.store.dispatch(loadAllFormationsCancelledAction())),
      share()
    );
  }
}
