import {Component, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {allFormations} from "../store";
import {AsyncPipe, NgForOf} from "@angular/common";
import {addFormationAction} from "../store/formations.actions";
import {DEFAULT_FORMATION, Formation} from "../model/formation";
import {FormationsStoreService} from "../service/formations-store.service";
import {FormationsState} from "../store/formations.reducer";

@Component({
  selector: 'app-create-formation',
  templateUrl: './create-formation.component.html',
  styleUrls: ['./create-formation.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonModal,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    FormsModule,
    IonFooter,
    IonSelect,
    IonSelectOption,
    NgForOf,
    AsyncPipe,
    ReactiveFormsModule
  ]
})
export class CreateFormationComponent {
  @Input() isOpen: boolean = false;
  @Output() dismissed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild(IonModal) modal: IonModal | undefined;
  formation: Formation = {...DEFAULT_FORMATION};

  private readonly store: Store<FormationsState> = inject(Store<FormationsState>);
  private readonly storeService: FormationsStoreService = inject(FormationsStoreService);
  readonly formations$ = this.store.select(allFormations());

  constructor() {
  }

  cancel() {
    this.dismissed.emit(true);
    this.formation = {...DEFAULT_FORMATION};
  }

  confirm() {
    this.store.dispatch(addFormationAction({
      payload: {...this.formation}
    }))
    this.dismissed.emit(true);
    this.formation = {...DEFAULT_FORMATION};
  }

  compareWith(formation1: Formation, formation2: Formation) {
    return formation1 && formation2 ? formation1.id === formation2.id : formation1 === formation2;
  }
}
