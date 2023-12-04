import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PortalComponent} from "../common/portal-component";
import {addIcons} from "ionicons";
import {trashOutline, trashSharp} from "ionicons/icons";
import {AsyncPipe, NgForOf} from "@angular/common";
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
    AsyncPipe,
  ],
  templateUrl: './update-portal.component.html',
  styleUrl: './update-portal.component.scss'
})
export class UpdatePortalComponent extends PortalComponent {
  @Input({required: true}) isOpen: boolean = false;
  @Output() dismissed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updatedPortalChange: EventEmitter<Portal> = new EventEmitter();

  @ViewChild(IonModal) modal: IonModal | undefined;

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
    this.usedFormations = this.portal.travelDurations.map(duration => duration.formation);
    this.updateUnusedFormations();
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
    this.usedFormations = this.portal.travelDurations.map(duration => duration.formation);
    this.updateUnusedFormations();
  }

  confirm() {
    this.updatedPortalChange.emit(this.portal);
    this.dismissed.emit(true);
  }
}
