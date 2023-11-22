import {Component, inject} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
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
  IonMenuToggle,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {addIcons} from "ionicons";
import {
  addOutline,
  addSharp,
  mapOutline,
  mapSharp,
  pencilOutline,
  pencilSharp,
  timeOutline,
  timeSharp,
  trainOutline,
  trainSharp,
  trashOutline,
  trashSharp
} from "ionicons/icons";
import {Route} from "../routes/model/route";
import {Timetable} from "../timetables/model/timetable";
import {FormationsStoreService} from "../formations/service/formations-store.service";
import {DEFAULT_FORMATION, Formation} from "../formations/model/formation";
import {deleteFormationAction} from "../formations/store/formations.actions";
import {Store} from "@ngrx/store";
import {CreateFormationComponent} from "../formations/create-formation/create-formation.component";
import {UpdateFormationComponent} from "../formations/update-formation/update-formation.component";
import {FormationsState} from "../formations/store/formations.reducer";
import {AuthService} from "../auth/service/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonContent,
    IonMenuToggle,
    NgIf,
    AsyncPipe,
    IonButton,
    IonIcon,
    NgForOf,
    IonList,
    IonItem,
    IonLabel,
    IonRow,
    IonCol,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonListHeader,
    IonFab,
    IonFabButton,
    IonFabList,
    IonFooter,
    CreateFormationComponent,
    UpdateFormationComponent
  ]
})
export class DashboardComponent {
  loggedIn$: Observable<boolean>;
  routes: Route[] = [
    {
      name: 'Köln-Aachen',
      country: {name: $localize`Germany`, code: 'de'},
      firstStation: {name: 'Köln Hbf'},
      lastStation: {name: 'Aachen Hbf'},
      numberOfStations: 30
    }
  ];
  timetables: Timetable[] = [];

  isCreateFormationModalOpen = false;
  isUpdateFormationModalOpen = false;
  updatedFormation: Formation = DEFAULT_FORMATION;
  private readonly formationsStoreService: FormationsStoreService = inject(FormationsStoreService);
  formations$ = this.formationsStoreService.getFormations$();

  constructor(private readonly authService: AuthService,
              private readonly formationsStore: Store<FormationsState>) {
    this.loggedIn$ = this.authService.isLoggedIn$();

    addIcons({
      addOutline,
      addSharp,
      trashOutline,
      trashSharp,
      mapOutline,
      mapSharp,
      timeOutline,
      timeSharp,
      trainOutline,
      trainSharp,
      pencilOutline,
      pencilSharp,
    });
  }

  addFormation() {
    this.isCreateFormationModalOpen = true;
  }

  updateFormation(formation: Formation) {
    this.isUpdateFormationModalOpen = true;
    this.updatedFormation = formation;
  }

  deleteFormation(formation: Formation) {
    this.formationsStore.dispatch(deleteFormationAction({payload: formation}));
  }
}
