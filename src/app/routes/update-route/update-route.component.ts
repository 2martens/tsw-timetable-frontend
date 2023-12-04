import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
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
import {Route} from "../model/route";
import {updateRouteAction} from "../store/routes.actions";
import {AsyncPipe, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreatePortalComponent} from "../create-portal/create-portal.component";
import {TypeaheadComponent} from "../../typeahead/typeahead.component";
import {addIcons} from "ionicons";
import {pencilOutline, pencilSharp, trashOutline, trashSharp} from "ionicons/icons";
import {RouteComponent} from "../common/route-component";
import {UpdatePortalComponent} from "../update-portal/update-portal.component";
import {CreateDepotComponent} from "../create-depot/create-depot.component";
import {UpdateDepotComponent} from "../update-depot/update-depot.component";

@Component({
  selector: 'app-update-route',
  standalone: true,
  templateUrl: './update-route.component.html',
  imports: [
    AsyncPipe,
    FormsModule,
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
    IonToolbar,
    NgForOf,
    ReactiveFormsModule,
    CreatePortalComponent,
    IonIcon,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonReorder,
    IonReorderGroup,
    TypeaheadComponent,
    UpdatePortalComponent,
    CreateDepotComponent,
    UpdateDepotComponent
  ],
  styleUrl: './update-route.component.scss'
})
export class UpdateRouteComponent extends RouteComponent {
  @Output() dismissed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild(IonModal) modal: IonModal | undefined;
  routeOnOpen: Route = {...this.route};

  constructor() {
    super();
    addIcons({
      trashOutline,
      trashSharp,
      pencilOutline,
      pencilSharp,
    })
  }

  private _isOpen: boolean = false;
  @Input({required: true}) set isOpen(newValue: boolean) {
    if (!this._isOpen && newValue) {
      this.routeOnOpen = {...this.route};
    }
    this._isOpen = newValue;
  }

  get isOpen() {
    return this._isOpen;
  }

  @Input({required: true}) set updatedRoute(newValue: Route) {
    this.route = {...newValue};
    this.routeOnOpen = {...newValue};
    this.updateUnusedStations();
  }

  cancel() {
    this.dismissed.emit(true);
    this.route = this.routeOnOpen;
    this.updateUnusedStations();
  }

  confirm() {
    this.route.firstStation = this.route.stations[0];
    this.route.lastStation = this.route.stations[this.route.stations.length - 1];
    this.route.numberOfStations = this.route.stations.length;
    this.store.dispatch(updateRouteAction({
      payload: {...this.route}
    }))
    this.dismissed.emit(true);
  }
}
