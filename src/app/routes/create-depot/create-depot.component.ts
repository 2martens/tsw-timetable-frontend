import {Component, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {NgForOf} from '@angular/common';
import {DepotComponent} from "../common/depot-component";
import {addIcons} from "ionicons";
import {trashOutline, trashSharp} from "ionicons/icons";
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
import {Station} from "../model/station";
import {DEFAULT_DEPOT, Depot} from "../model/depot";

@Component({
  selector: 'app-create-depot',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
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
    IonToolbar,
    TypeaheadComponent,
  ],
  templateUrl: './create-depot.component.html',
  styleUrl: './create-depot.component.scss'
})
export class CreateDepotComponent extends DepotComponent {
  @Input({required: true}) isOpen: boolean = false;
  @Output() dismissed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() createdDepot: EventEmitter<Depot> = new EventEmitter<Depot>();
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

  constructor() {
    super();
    addIcons({
      trashOutline,
      trashSharp,
    });
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
    this.depot = {...DEFAULT_DEPOT};
  }

  confirm() {
    this.createdDepot.emit({...this.depot});
    this.dismissed.emit(true);
    this.depot = {...DEFAULT_DEPOT};
  }
}
