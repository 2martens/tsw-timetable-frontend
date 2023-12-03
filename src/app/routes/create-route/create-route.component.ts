import {Component, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
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
  IonListHeader,
  IonModal,
  IonPopover,
  IonReorder,
  IonReorderGroup,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {Store} from "@ngrx/store";
import {DEFAULT_ROUTE} from "../model/route";
import {RoutesState} from "../store/routes.reducer";
import {RoutesStoreService} from "../service/routes-store.service";
import {allCountries} from "../store";
import {addRouteAction} from "../store/routes.actions";
import {AsyncPipe, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TypeaheadComponent} from "../../typeahead/typeahead.component";
import {addIcons} from "ionicons";
import {pencilOutline, pencilSharp, trashOutline, trashSharp} from "ionicons/icons";
import {CreatePortalComponent} from "../create-portal/create-portal.component";
import {RouteComponent} from "../common/route-component";
import {UpdatePortalComponent} from "../update-portal/update-portal.component";
import {CreateDepotComponent} from "../create-depot/create-depot.component";
import {UpdateDepotComponent} from "../update-depot/update-depot.component";

@Component({
  selector: 'app-create-route',
  standalone: true,
  templateUrl: './create-route.component.html',
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
    IonList,
    IonReorderGroup,
    IonLabel,
    IonReorder,
    IonListHeader,
    IonPopover,
    IonSearchbar,
    IonItemSliding,
    IonItemOption,
    IonItemOptions,
    IonIcon,
    TypeaheadComponent,
    CreatePortalComponent,
    UpdatePortalComponent,
    CreateDepotComponent,
    UpdateDepotComponent
  ],
  styleUrl: './create-route.component.scss'
})
export class CreateRouteComponent extends RouteComponent {
  @Input() isOpen: boolean = false;
  @Output() dismissed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild(IonModal) modal: IonModal | undefined;

  private readonly store: Store<RoutesState> = inject(Store<RoutesState>);
  private readonly storeService: RoutesStoreService = inject(RoutesStoreService);
  readonly countries$ = this.store.select(allCountries());
  readonly stations$ = this.storeService.getStations$();

  constructor() {
    super();
    addIcons({
      trashOutline,
      trashSharp,
      pencilOutline,
      pencilSharp,
    });
  }

  cancel() {
    this.dismissed.emit(true);
    this.route = {...DEFAULT_ROUTE};
  }

  confirm() {
    this.route.firstStation = this.route.stations[0];
    this.route.lastStation = this.route.stations[this.route.stations.length - 1];
    this.route.numberOfStations = this.route.stations.length;
    this.store.dispatch(addRouteAction({
      payload: {...this.route}
    }))
    this.dismissed.emit(true);
    this.route = {...DEFAULT_ROUTE};
  }
}
