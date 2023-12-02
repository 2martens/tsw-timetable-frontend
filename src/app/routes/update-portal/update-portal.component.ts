import {Component, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {PortalComponent} from "../common/portal-component";
import {addIcons} from "ionicons";
import {trashOutline, trashSharp} from "ionicons/icons";
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {Portal} from "../model/portal";
import {FormationsStoreService} from "../../formations/service/formations-store.service";
import {map, Observable} from "rxjs";
import {Formation} from "../../formations/model/formation";
import {Station} from "../model/station";

@Component({
  selector: 'app-update-portal',
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
    ReactiveFormsModule,
    TypeaheadComponent,
  ],
  templateUrl: './update-portal.component.html',
  styleUrl: './update-portal.component.scss'
})
export class UpdatePortalComponent extends PortalComponent {
  @Input({required: true}) isOpen: boolean = false;
  @Output() dismissed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updatedPortalChange: EventEmitter<Portal> = new EventEmitter();

  @ViewChild(IonModal) modal: IonModal | undefined;

  private readonly storeService: FormationsStoreService = inject(FormationsStoreService);
  readonly formations$ = this.storeService.getFormations$();
  readonly unusedFormations$: Observable<Formation[]> = this.formations$.pipe(
    map(formations => formations.filter(
      formation => !this.portal.travelDurations
        .map(duration => duration.formation)
        .includes(formation)
    )),
  );

  portalOnOpen: Portal = {...this.portal};

  constructor() {
    super();
    addIcons({
      trashOutline,
      trashSharp,
    });
  }

  @Input({required: true}) set updatedPortal(newValue: Portal) {
    this.portal = {...newValue};
    this.portalOnOpen = {...newValue};
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
    this.portal = this.portalOnOpen;
  }

  confirm() {
    this.updatedPortalChange.emit(this.portal);
    this.dismissed.emit(true);
  }
}
