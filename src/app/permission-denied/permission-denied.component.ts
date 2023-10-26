import {Component} from '@angular/core';
import {IonCol, IonGrid, IonRow} from "@ionic/angular/standalone";

@Component({
  selector: 'app-permission-denied',
  templateUrl: './permission-denied.component.html',
  styleUrls: ['./permission-denied.component.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol]
})
export class PermissionDeniedComponent {

}
