import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, AsyncPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PricingComponent {

  constructor() {
  }
}
