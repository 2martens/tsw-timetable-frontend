import {Component, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {NgForOf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
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
import {DEFAULT_PORTAL, Portal} from "../model/portal";
import {map, Observable} from "rxjs";
import {Station} from "../model/station";
import {TypeaheadComponent} from "../../typeahead/typeahead.component";
import {Formation} from "../../formations/model/formation";
import {FormationsStoreService} from "../../formations/service/formations-store.service";
import {PortalComponent} from "../common/portal-component";
import {addIcons} from "ionicons";
import {trashOutline, trashSharp} from "ionicons/icons";

@Component({
  selector: 'app-create-portal',
  standalone: true,
  imports: [
    FormsModule, IonContent, IonHeader, IonInput, IonModal, IonTitle, IonToolbar,
    ReactiveFormsModule, IonSelect, IonSelectOption, IonButton, IonButtons, IonFooter, IonIcon, IonItem, IonItemOption,
    IonItemOptions, IonItemSliding, IonLabel, IonList, TypeaheadComponent, IonDatetime, NgForOf
  ],
  templateUrl: './create-portal.component.html',
  styleUrl: './create-portal.component.scss'
})
export class CreatePortalComponent extends PortalComponent {
  @Input({required: true}) isOpen: boolean = false;
  @Output() dismissed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() createdPortal: EventEmitter<Portal> = new EventEmitter<Portal>();
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
    this.portal = {...DEFAULT_PORTAL};
  }

  confirm() {
    this.createdPortal.emit({...this.portal});
    this.dismissed.emit(true);
    this.portal = {...DEFAULT_PORTAL};
  }


}
