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
  selector: 'app-legal-notice',
  standalone: true,
  templateUrl: './legal-notice.component.html',
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
  styleUrls: ['./legal-notice.component.scss']
})
export class LegalNoticeComponent {
}
