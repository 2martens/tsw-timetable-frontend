import {Component, inject} from '@angular/core';
import {DEFAULT_TIMETABLE, Timetable} from "./model/timetable";
import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {addOutline, addSharp, trashOutline, trashSharp} from "ionicons/icons";
import {AsyncPipe, NgForOf} from "@angular/common";
import {TimetableStoreService} from "./service/timetable-store.service";
import {AuthService} from "../auth/service/auth.service";
import {filter, map} from "rxjs";
import {Store} from "@ngrx/store";
import {TimetablesState} from "./store/timetables.reducer";
import {deleteTimetableAction} from "./store/timetables.actions";

@Component({
  selector: 'app-timetables',
  templateUrl: './timetables.component.html',
  styleUrls: ['./timetables.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonList,
    IonListHeader,
    IonLabel,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonFab,
    IonFabButton,
    IonFooter,
    NgForOf,
    AsyncPipe
  ]
})
export class TimetablesComponent {
  isCreateModalOpen = false;
  isUpdateModalOpen = false;
  updatedTimetable: Timetable = {...DEFAULT_TIMETABLE};

  private readonly storeService: TimetableStoreService = inject(TimetableStoreService);
  timetables$ = this.storeService.getTimetables$();

  private readonly authService: AuthService = inject(AuthService);
  readonly user$ = this.authService.getUser$();
  readonly hasPersonalPlan$ = this.user$.pipe(
    map(user => user.roles),
    filter(roles => roles.includes('PERSONAL_PLAN'))
  );

  constructor(private readonly store: Store<TimetablesState>) {
    addIcons({
      addOutline,
      addSharp,
      trashOutline,
      trashSharp,
    });
  }

  addTimetable() {
    this.isCreateModalOpen = true;
  }

  updateTimetable(timetable: Timetable) {
    this.updatedTimetable = timetable;
    this.isUpdateModalOpen = true;
  }

  deleteTimetable(timetable: Timetable) {
    this.store.dispatch(deleteTimetableAction({payload: timetable}));
  }

}
