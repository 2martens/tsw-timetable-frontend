import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {AsyncPipe, NgForOf} from "@angular/common";
import {SegmentCustomEvent} from "@ionic/angular";
import {Product} from "../model/product";
import {addIcons} from "ionicons";
import {checkmarkCircleOutline, checkmarkCircleSharp} from "ionicons/icons";
import {FormsModule, NgForm} from "@angular/forms";
import {getProducts} from "../store";
import {Store} from "@ngrx/store";
import {subscribeAction} from "../store/subscription.actions";
import {filter, map, Observable, Subscription} from "rxjs";
import {SubscriptionState} from "../store/subscription.reducer";
import {AuthService} from "../../auth/service/auth.service";
import {Message} from "../../messages/model/message";
import {MessagesState} from "../../messages/store/messages.reducer";
import {ActivatedRoute, EventType, NavigationEnd, Router} from "@angular/router";
import {addMessageAction} from "../../messages/store/messages.actions";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, AsyncPipe, IonGrid, IonRow, IonCol,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonSegment, IonSegmentButton, IonLabel,
    IonButton, NgForOf, IonList, IonListHeader, IonItem, IonIcon, FormsModule, IonFooter,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PricingComponent implements OnDestroy {
  private readonly store: Store<SubscriptionState> = inject(Store<SubscriptionState>);
  private readonly authService: AuthService = inject(AuthService);

  readonly products$: Observable<Product[]> = this.store.select(getProducts());
  readonly isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$();
  readonly roles$: Observable<string[]> = this.authService.getUser$().pipe(
    map(user => user.roles)
  );

  mode: string | number = 'monthly';

  private messages: Record<string, Message> = {
    cancel: {
      text: $localize`You have cancelled the subscription process. No payments will be deducted.`,
      color: 'primary',
      durationInMs: 5000,
    }
  }
  private subscription: Subscription;

  constructor(private readonly messagesStore: Store<MessagesState>,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router) {
    addIcons({
      checkmarkCircleOutline,
      checkmarkCircleSharp,
    });

    this.subscription = this.router.events.pipe(
      filter(event => event.type == EventType.NavigationEnd),
      map(event => event as NavigationEnd),
      filter(event => event.url.startsWith('/pricing?state='))
    ).subscribe(() => this.triggerFeedbackMessage());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSegmentChange(event: SegmentCustomEvent) {
    this.mode = event.detail.value || 'monthly';
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(subscribeAction({lookupKey: form.value['lookup_key']}));
  }

  private triggerFeedbackMessage() {
    const state = this.activatedRoute.snapshot.queryParamMap.get('state') || '';
    if (state in this.messages) {
      this.messagesStore.dispatch(addMessageAction({message: this.messages[state]}));
    }
  }
}
