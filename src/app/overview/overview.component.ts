import {Component} from '@angular/core';
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonButtons,
    IonContent,
    IonMenuButton,
    IonTitle,
    IonToolbar
  ]
})
export class OverviewComponent {

  constructor() {
  }

}
