import {Component, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DepotComponent} from "../common/depot-component";
import {FormsModule} from "@angular/forms";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {TypeaheadComponent} from "../../typeahead/typeahead.component";
import {FormationsStoreService} from "../../formations/service/formations-store.service";
import {map, Observable} from "rxjs";
import {Formation} from "../../formations/model/formation";
import {addIcons} from "ionicons";
import {trashOutline, trashSharp} from "ionicons/icons";
import {Station} from "../model/station";
import {Depot} from "../model/depot";

@Component({
  selector: 'app-update-depot',
  standalone: true,
  imports: [CommonModule, FormsModule, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar, TypeaheadComponent],
  templateUrl: './update-depot.component.html',
  styleUrl: './update-depot.component.scss'
})
export class UpdateDepotComponent extends DepotComponent {
  @Input({required: true}) isOpen: boolean = false;
  @Output() dismissed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updatedDepotChange: EventEmitter<Depot> = new EventEmitter();

  @ViewChild(IonModal) modal: IonModal | undefined;

  private readonly storeService: FormationsStoreService = inject(FormationsStoreService);
  readonly formations$ = this.storeService.getFormations$();
  readonly unusedFormations$: Observable<Formation[]> = this.formations$.pipe(
    map(formations => formations.filter(
      formation => !this.depot.travelDurations
        .map(duration => duration.formation)
        .includes(formation)
    )),
  );

  depotOnOpen: Depot = {...this.depot};

  constructor() {
    super();
    addIcons({
      trashOutline,
      trashSharp,
    });
  }

  @Input({required: true}) set updatedDepot(newValue: Depot) {
    this.depot = {...newValue};
    this.depotOnOpen = {...newValue};
  }

  _stations?: Station[];
  @Input({required: true}) set stations(newStations: Station[]) {
    if (newStations !== null) {
      this._stations = newStations;
    }
  }

  get stations() {
    return this._stations || [];
  }

  cancel() {
    this.dismissed.emit(true);
    this.depot = this.depotOnOpen;
  }

  confirm() {
    this.updatedDepotChange.emit(this.depot);
    this.dismissed.emit(true);
  }
}
