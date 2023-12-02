import {Component, inject} from '@angular/core';
import {DEFAULT_ROUTE, Route} from "./model/route";
import {addIcons} from "ionicons";
import {addOutline, addSharp, pencilOutline, pencilSharp, trashOutline, trashSharp} from "ionicons/icons";
import {AsyncPipe, NgForOf} from "@angular/common";
import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {RoutesStoreService} from "./service/routes-store.service";
import {deleteRouteAction} from "./store/routes.actions";
import {Store} from "@ngrx/store";
import {RoutesState} from "./store/routes.reducer";
import {CreateFormationComponent} from "../formations/create-formation/create-formation.component";
import {UpdateFormationComponent} from "../formations/update-formation/update-formation.component";
import {CreateRouteComponent} from "./create-route/create-route.component";
import {UpdateRouteComponent} from "./update-route/update-route.component";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    NgForOf,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonList,
    IonListHeader,
    IonLabel,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonFab,
    IonFabButton,
    IonFooter,
    AsyncPipe,
    CreateFormationComponent,
    UpdateFormationComponent,
    CreateRouteComponent,
    UpdateRouteComponent
  ]
})
export class RoutesComponent {
  isCreateModalOpen = false;
  isUpdateModalOpen = false;
  updatedRoute: Route = {...DEFAULT_ROUTE};

  private readonly storeService: RoutesStoreService = inject(RoutesStoreService);
  routes$ = this.storeService.getRoutes$();

  constructor(private readonly store: Store<RoutesState>) {
    addIcons({
      addOutline,
      addSharp,
      trashOutline,
      trashSharp,
      pencilOutline,
      pencilSharp,
    });
  }

  addRoute() {
    this.isCreateModalOpen = true;
  }

  updateRoute(route: Route) {
    this.updatedRoute = route;
    this.isUpdateModalOpen = true;
  }

  deleteRoute(route: Route) {
    this.store.dispatch(deleteRouteAction({payload: route}));
  }
}
