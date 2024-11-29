import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf} from '@angular/common';
import {TimetableComponent} from "../common/timetable-component";
import {CreateDepotComponent} from "../../routes/create-depot/create-depot.component";
import {CreatePortalComponent} from "../../routes/create-portal/create-portal.component";
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
  IonReorder,
  IonReorderGroup,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {TypeaheadComponent} from "../../typeahead/typeahead.component";
import {UpdateDepotComponent} from "../../routes/update-depot/update-depot.component";
import {UpdatePortalComponent} from "../../routes/update-portal/update-portal.component";
import {addIcons} from "ionicons";
import {pencilOutline, pencilSharp, trashOutline, trashSharp} from "ionicons/icons";
import {Timetable} from "../model/timetable";
import {updateTimetableAction} from "../store/timetables.actions";

@Component({
  selector: 'app-update-timetable',
  standalone: true,
  imports: [NgForOf, AsyncPipe, CreateDepotComponent, CreatePortalComponent, FormsModule, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonReorder, IonReorderGroup, IonSelect, IonSelectOption, IonTitle, IonToolbar, TypeaheadComponent, UpdateDepotComponent, UpdatePortalComponent, DatePipe],
  templateUrl: './update-timetable.component.html',
  styleUrl: './update-timetable.component.scss'
})
export class UpdateTimetableComponent extends TimetableComponent {
  @Output() dismissed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild(IonModal) modal: IonModal | undefined;

  timetableOnOpen: Timetable = {...this.timetable};

  constructor() {
    super();
    addIcons({
      trashOutline,
      trashSharp,
      pencilOutline,
      pencilSharp,
    });
  }

  private _isOpen: boolean = false;
  @Input({required: true}) set isOpen(newValue: boolean) {
    if (!this._isOpen && newValue) {
      this.timetableOnOpen = {...this.timetable};
    }
    this._isOpen = newValue;
  }

  get isOpen() {
    return this._isOpen;
  }

  @Input({required: true}) set updatedTimetable(newValue: Timetable) {
    this.timetable = {...newValue};
    this.timetableOnOpen = {...newValue};
  }

  cancel() {
    this.dismissed.emit(true);
    this.timetable = this.timetableOnOpen;
  }

  confirm() {
    this.store.dispatch(updateTimetableAction({
      payload: {...this.timetable}
    }))
    this.dismissed.emit(true);
  }
}
