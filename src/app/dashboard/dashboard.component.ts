import {Component} from '@angular/core';
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
import {KeycloakService} from "keycloak-angular";
import {from, Observable} from "rxjs";
import {addIcons} from "ionicons";
import {
  addOutline,
  addSharp,
  mapOutline,
  mapSharp,
  time,
  timeOutline,
  timeSharp,
  trainOutline,
  trainSharp,
  trashOutline,
  trashSharp
} from "ionicons/icons";
import {Route} from "../routes/model/route";
import {Formation} from "../formations/model/formation";
import {Timetable} from ".././timetables/model/timetable";

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
    IonFooter
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
  formations: Formation[] = [];

  constructor(private readonly keycloakService: KeycloakService) {
    this.loggedIn$ = from(this.keycloakService.isLoggedIn());

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
    });
  }

  protected readonly time = time;
}
