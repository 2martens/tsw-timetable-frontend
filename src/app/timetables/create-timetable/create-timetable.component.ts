import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateDepotComponent} from "../../routes/create-depot/create-depot.component";
import {CreatePortalComponent} from "../../routes/create-portal/create-portal.component";
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
import {TimetableComponent} from "../common/timetable-component";
import {addIcons} from "ionicons";
import {pencilOutline, pencilSharp, trashOutline, trashSharp} from "ionicons/icons";
import {DEFAULT_TIMETABLE} from "../model/timetable";
import {addTimetableAction} from "../store/timetables.actions";

@Component({
  selector: 'app-create-timetable',
  standalone: true,
  imports: [CommonModule, CreateDepotComponent, CreatePortalComponent, FormsModule, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonReorder, IonReorderGroup, IonSelect, IonSelectOption, IonTitle, IonToolbar, ReactiveFormsModule, TypeaheadComponent, UpdateDepotComponent, UpdatePortalComponent],
  templateUrl: './create-timetable.component.html',
  styleUrl: './create-timetable.component.scss'
})
export class CreateTimetableComponent extends TimetableComponent {
  @Input() isOpen: boolean = false;
  @Output() dismissed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild(IonModal) modal: IonModal | undefined;

  minDate = new Date();
  minDateString: string;

  constructor() {
    super();
    addIcons({
      trashOutline,
      trashSharp,
      pencilOutline,
      pencilSharp,
    });
    this.minDate.setDate(this.minDate.getDate() + 2);
    this.minDateString = this.minDate.toISOString().substring(0, 10);
  }

  cancel() {
    this.dismissed.emit(true);
    this.timetable = {...DEFAULT_TIMETABLE};
  }

  confirm() {
    this.store.dispatch(addTimetableAction({
      payload: {...this.timetable}
    }))
    this.dismissed.emit(true);
    this.timetable = {...DEFAULT_TIMETABLE};
  }
}
