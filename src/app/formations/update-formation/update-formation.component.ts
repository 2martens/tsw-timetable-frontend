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
import {AsyncPipe, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Store} from "@ngrx/store";
import {allFormations} from "../store";
import {FormationsStoreService} from "../service/formations-store.service";
import {DEFAULT_FORMATION, Formation} from "../model/formation";
import {updateFormationAction} from "../store/formations.actions";
import {FormationsState} from "../store/formations.reducer";

@Component({
  selector: 'app-update-formation',
  templateUrl: './update-formation.component.html',
  styleUrls: ['./update-formation.component.scss'],
  standalone: true,
  imports: [
    IonModal,
    AsyncPipe,
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonInput,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar,
    NgForOf
  ]
})
export class UpdateFormationComponent {
  @ViewChild(IonModal) modal: IonModal | undefined;

  @Output() dismissed: EventEmitter<boolean> = new EventEmitter<boolean>();

  formation: Formation = {...DEFAULT_FORMATION};
  formationOnOpen: Formation = {...this.formation};

  private readonly store: Store<FormationsState> = inject(Store<FormationsState>);
  private readonly storeService: FormationsStoreService = inject(FormationsStoreService);
  readonly formations$ = this.store.select(allFormations());

  constructor() {
  }

  private _isOpen = false;
  @Input({required: true}) set isOpen(newValue: boolean) {
    if (!this._isOpen && newValue) {
      this.formationOnOpen = {...this.formation};
    }
    this._isOpen = newValue;
  }

  get isOpen() {
    return this._isOpen;
  }

  @Input({required: true}) set updatedFormation(newValue: Formation) {
    this.formation = {...newValue};
    this.formationOnOpen = {...newValue};
  }

  cancel() {
    this.dismissed.emit(true);
    this.formation = {...this.formationOnOpen};
  }

  confirm() {
    this.store.dispatch(updateFormationAction({
      payload: {...this.formation}
    }))
    this.dismissed.emit(true);
  }

  compareWith(formation1: Formation, formation2: Formation) {
    return formation1 && formation2 ? formation1.id === formation2.id : formation1 === formation2;
  }

}
