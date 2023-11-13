import {Component} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {openOutline, openSharp, trashOutline, trashSharp} from "ionicons/icons";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  imports: [
    IonContent,
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonCardTitle,
    IonIcon
  ],
  standalone: true
})
export class AccountComponent {
  keycloakURL: string = environment.keycloakURL
  realm: string = environment.realm

  constructor() {
    addIcons({
      openOutline,
      openSharp,
      trashOutline,
      trashSharp,
    });
  }
}
