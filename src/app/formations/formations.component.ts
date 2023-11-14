import {Component, inject, OnInit} from '@angular/core';
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
import {addIcons} from "ionicons";
import {addOutline, addSharp, trashOutline, trashSharp} from "ionicons/icons";
import {AsyncPipe, NgForOf} from "@angular/common";
import {allFormations, FormationsState} from "./store";
import {Store} from "@ngrx/store";
import {loadAllFormationsAction} from "./store/formations.actions";

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
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
    IonFooter,
    NgForOf,
    AsyncPipe
  ]
})
export class FormationsComponent implements OnInit {
  private readonly store: Store<FormationsState> = inject(Store<FormationsState>);
  formations$ = this.store.select(allFormations());

  constructor() {
    addIcons({
      addOutline,
      addSharp,
      trashOutline,
      trashSharp,
    });
  }

  ngOnInit() {
    this.store.dispatch(loadAllFormationsAction());
  }

  addFormation() {
    // TODO: trigger modal form overlay
  }

}
