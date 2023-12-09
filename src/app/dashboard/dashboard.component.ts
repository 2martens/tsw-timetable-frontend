import {Component, inject, OnDestroy} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
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
  IonMenuToggle,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";
import {filter, map, Subscription} from "rxjs";
import {addIcons} from "ionicons";
import {
  addOutline,
  addSharp,
  mapOutline,
  mapSharp,
  pencilOutline,
  pencilSharp,
  timeOutline,
  timeSharp,
  trainOutline,
  trainSharp,
  trashOutline,
  trashSharp
} from "ionicons/icons";
import {DEFAULT_ROUTE, Route} from "../routes/model/route";
import {DEFAULT_TIMETABLE, Timetable, TimetableState, TimetableStateTexts} from "../timetables/model/timetable";
import {FormationsStoreService} from "../formations/service/formations-store.service";
import {DEFAULT_FORMATION, Formation} from "../formations/model/formation";
import {deleteFormationAction} from "../formations/store/formations.actions";
import {Store} from "@ngrx/store";
import {CreateFormationComponent} from "../formations/create-formation/create-formation.component";
import {UpdateFormationComponent} from "../formations/update-formation/update-formation.component";
import {FormationsState} from "../formations/store/formations.reducer";
import {ActivatedRoute, EventType, NavigationEnd, Router} from "@angular/router";
import {addMessageAction} from "../messages/store/messages.actions";
import {Message} from "../messages/model/message";
import {MessagesState} from "../messages/store/messages.reducer";
import {CreateRouteComponent} from "../routes/create-route/create-route.component";
import {UpdateRouteComponent} from "../routes/update-route/update-route.component";
import {RoutesStoreService} from "../routes/service/routes-store.service";
import {RoutesState} from "../routes/store/routes.reducer";
import {deleteRouteAction} from "../routes/store/routes.actions";
import {AuthService} from "../auth/service/auth.service";
import {TimetableStoreService} from "../timetables/service/timetable-store.service";
import {TimetablesState} from "../timetables/store/timetables.reducer";
import {deleteTimetableAction} from "../timetables/store/timetables.actions";
import {CreateTimetableComponent} from "../timetables/create-timetable/create-timetable.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonContent,
    IonMenuToggle,
    AsyncPipe,
    IonButton,
    IonIcon,
    NgForOf,
    IonList,
    IonItem,
    IonLabel,
    IonRow,
    IonCol,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonListHeader,
    IonFab,
    IonFabButton,
    IonFabList,
    IonFooter,
    CreateFormationComponent,
    UpdateFormationComponent,
    CreateRouteComponent,
    UpdateRouteComponent,
    CreateTimetableComponent,
    DatePipe
  ]
})
export class DashboardComponent implements OnDestroy {
  isCreateFormationModalOpen = false;
  isUpdateFormationModalOpen = false;
  updatedFormation: Formation = DEFAULT_FORMATION;
  private readonly formationsStoreService: FormationsStoreService = inject(FormationsStoreService);
  formations$ = this.formationsStoreService.getFormations$();

  isCreateTimetableModalOpen = false;
  isUpdateTimetableModalOpen = false;
  updatedTimetable: Timetable = DEFAULT_TIMETABLE;
  private readonly timetableStoreService: TimetableStoreService = inject(TimetableStoreService);
  timetables$ = this.timetableStoreService.getTimetables$();

  isCreateRouteModalOpen = false;
  isUpdateRouteModalOpen = false;
  updatedRoute: Route = DEFAULT_ROUTE;
  private readonly routesStoreService: RoutesStoreService = inject(RoutesStoreService);
  routes$ = this.routesStoreService.getRoutes$();

  private readonly authService: AuthService = inject(AuthService);
  readonly user$ = this.authService.getUser$();
  readonly hasPersonalPlan$ = this.user$.pipe(
    map(user => user.roles),
    filter(roles => roles.includes('PERSONAL_PLAN'))
  );

  private messages: Record<string, Message> = {
    success: {
      text: $localize`You have successfully subscribed. The subscription can be managed from the account settings.`,
      color: 'success',
      durationInMs: 5000,
    }
  }

  private subscription: Subscription;

  constructor(private readonly formationsStore: Store<FormationsState>,
              private readonly timetablesStore: Store<TimetablesState>,
              private readonly routesStore: Store<RoutesState>,
              private readonly messagesStore: Store<MessagesState>,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) {

    addIcons({
      addOutline,
      addSharp,
      trashOutline,
      trashSharp,
      mapOutline,
      mapSharp,
      timeOutline,
      timeSharp,
      trainOutline,
      trainSharp,
      pencilOutline,
      pencilSharp,
    });

    this.subscription = this.router.events.pipe(
      filter(event => event.type == EventType.NavigationEnd),
      map(event => event as NavigationEnd),
      filter(event => event.url.startsWith('/dashboard?state='))
    ).subscribe(() => this.triggerFeedbackMessage());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addFormation() {
    this.isCreateFormationModalOpen = true;
  }

  updateFormation(formation: Formation) {
    this.isUpdateFormationModalOpen = true;
    this.updatedFormation = formation;
  }

  deleteFormation(formation: Formation) {
    this.formationsStore.dispatch(deleteFormationAction({payload: formation}));
  }

  addTimetable() {
    this.isCreateTimetableModalOpen = true;
  }

  updateTimetable(timetable: Timetable) {
    this.isUpdateTimetableModalOpen = true;
    this.updatedTimetable = timetable;
  }

  deleteTimetable(timetable: Timetable) {
    this.timetablesStore.dispatch(deleteTimetableAction({payload: timetable}));
  }

  addRoute() {
    this.isCreateRouteModalOpen = true;
  }

  updateRoute(route: Route) {
    this.isUpdateRouteModalOpen = true;
    this.updatedRoute = route;
  }

  deleteRoute(route: Route) {
    this.routesStore.dispatch(deleteRouteAction({payload: route}));
  }

  private triggerFeedbackMessage() {
    const state = this.activatedRoute.snapshot.queryParamMap.get('state') || '';
    if (state in this.messages) {
      this.messagesStore.dispatch(addMessageAction({message: this.messages[state]}));
    }
  }

  protected readonly TimetableState = TimetableState;
  protected readonly TimetableStateTexts = TimetableStateTexts;
}
