import {Component} from '@angular/core';
import {
  IonButtons, IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton, IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  imports: [
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol
  ],
})
export class PrivacyPolicyComponent {

}
