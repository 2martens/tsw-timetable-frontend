import {Component} from '@angular/core';
import {Route} from "./model/route";
import {addIcons} from "ionicons";
import {addOutline, addSharp, trashOutline, trashSharp} from "ionicons/icons";
import {NgForOf} from "@angular/common";
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

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    NgForOf,
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
    IonFooter
  ]
})
export class RoutesComponent {

  routes: Route[] = [
    {
      name: 'Köln-Aachen',
      country: {name: $localize`Germany`, code: 'de'},
      firstStation: {name: 'Köln Hbf'},
      lastStation: {name: 'Aachen Hbf'},
      numberOfStations: 30
    }
  ];

  constructor() {
    addIcons({
      addOutline,
      addSharp,
      trashOutline,
      trashSharp,
    });
  }
}
