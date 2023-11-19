import {Component, inject} from '@angular/core';
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
import {addOutline, addSharp, pencilOutline, pencilSharp, trashOutline, trashSharp} from "ionicons/icons";
import {AsyncPipe, NgForOf} from "@angular/common";
import {CreateFormationComponent} from "./create-formation/create-formation.component";
import {FormationsStoreService} from "./service/formations-store.service";
import {DEFAULT_FORMATION, Formation} from "./model/formation";
import {Store} from "@ngrx/store";
import {deleteFormationAction} from "./store/formations.actions";
import {UpdateFormationComponent} from "./update-formation/update-formation.component";
import {FormationsState} from "./store/formations.reducer";

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
    AsyncPipe,
    CreateFormationComponent,
    UpdateFormationComponent
  ]
})
export class FormationsComponent {
  isCreateModalOpen = false;
  isUpdateModalOpen = false;
  updatedFormation: Formation = DEFAULT_FORMATION;

  private readonly storeService: FormationsStoreService = inject(FormationsStoreService);
  formations$ = this.storeService.getFormations$();

  constructor(private readonly store: Store<FormationsState>) {
    addIcons({
      addOutline,
      addSharp,
      trashOutline,
      trashSharp,
      pencilOutline,
      pencilSharp,
    });
  }

  addFormation() {
    this.isCreateModalOpen = true;
  }

  updateFormation(formation: Formation) {
    this.isUpdateModalOpen = true;
    this.updatedFormation = formation;
  }

  deleteFormation(formation: Formation) {
    this.store.dispatch(deleteFormationAction({payload: formation}));
  }

}
