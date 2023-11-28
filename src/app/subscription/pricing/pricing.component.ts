import {Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
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
import {map, Observable} from "rxjs";
import {SubscriptionState} from "../store/subscription.reducer";
import {AuthService} from "../../auth/service/auth.service";

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
export class PricingComponent {
  private readonly store: Store<SubscriptionState> = inject(Store<SubscriptionState>);
  private readonly authService: AuthService = inject(AuthService);

  readonly products$: Observable<Product[]> = this.store.select(getProducts());
  readonly isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$();
  readonly roles$: Observable<string[]> = this.authService.getUser$().pipe(
    map(user => user.roles)
  );

  mode: string | number = 'monthly';

  constructor() {
    addIcons({
      checkmarkCircleOutline,
      checkmarkCircleSharp,
    })
  }

  onSegmentChange(event: SegmentCustomEvent) {
    this.mode = event.detail.value || 'monthly';
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(subscribeAction({lookupKey: form.value['lookup_key']}));
  }
}
