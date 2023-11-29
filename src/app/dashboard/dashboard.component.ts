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
import {AsyncPipe, NgForOf} from "@angular/common";
import {filter, map, Observable, Subscription, withLatestFrom} from "rxjs";
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
import {Route} from "../routes/model/route";
import {Timetable} from "../timetables/model/timetable";
import {FormationsStoreService} from "../formations/service/formations-store.service";
import {DEFAULT_FORMATION, Formation} from "../formations/model/formation";
import {deleteFormationAction} from "../formations/store/formations.actions";
import {Store} from "@ngrx/store";
import {CreateFormationComponent} from "../formations/create-formation/create-formation.component";
import {UpdateFormationComponent} from "../formations/update-formation/update-formation.component";
import {FormationsState} from "../formations/store/formations.reducer";
import {SubscriptionService} from "../subscription/service/subscription.service";
import {ActivatedRoute, EventType, NavigationEnd, Router} from "@angular/router";
import {addMessageAction} from "../messages/store/messages.actions";
import {Message} from "../messages/model/message";
import {MessagesState} from "../messages/store/messages.reducer";

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
    UpdateFormationComponent
  ]
})
export class DashboardComponent implements OnDestroy {
  hasActivePlan$: Observable<boolean>;
  routes: Route[] = [
    {
      name: 'Köln-Aachen',
      country: {name: $localize`Germany`, code: 'de'},
      firstStation: {name: 'Köln Hbf'},
      lastStation: {name: 'Aachen Hbf'},
      numberOfStations: 30
    }
  ];
  timetables: Timetable[] = [];

  isCreateFormationModalOpen = false;
  isUpdateFormationModalOpen = false;
  updatedFormation: Formation = DEFAULT_FORMATION;
  private readonly formationsStoreService: FormationsStoreService = inject(FormationsStoreService);
  formations$ = this.formationsStoreService.getFormations$();

  private messages: Record<string, Message> = {
    success: {
      text: $localize`You have successfully subscribed. The subscription can be managed from the account settings.`,
      color: 'success',
      durationInMs: 5000,
    }
  }

  private subscription: Subscription;

  constructor(private readonly subscriptionService: SubscriptionService,
              private readonly formationsStore: Store<FormationsState>,
              private readonly messagesStore: Store<MessagesState>,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) {
    this.hasActivePlan$ = this.subscriptionService.hasActivePlan$();

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
      withLatestFrom(this.hasActivePlan$),
      filter(([_, hasActivePlan]) => hasActivePlan),
      filter(([event, _]) => event.url.startsWith('/?state='))
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

  private triggerFeedbackMessage() {
    const state = this.activatedRoute.snapshot.queryParamMap.get('state') || '';
    if (state in this.messages) {
      this.messagesStore.dispatch(addMessageAction({message: this.messages[state]}));
    }
  }
}
