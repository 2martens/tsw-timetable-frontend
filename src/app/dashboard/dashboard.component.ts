import {Component} from '@angular/core';
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar} from "@ionic/angular/standalone";

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
    IonContent
  ]
})
export class DashboardComponent {

}
