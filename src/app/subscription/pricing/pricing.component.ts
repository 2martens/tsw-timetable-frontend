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
import {Product} from "./model/product";
import {addIcons} from "ionicons";
import {checkmarkCircleOutline, checkmarkCircleSharp} from "ionicons/icons";
import {FormsModule, NgForm} from "@angular/forms";
import {getProducts} from "./store";
import {Store} from "@ngrx/store";
import {subscribeAction} from "./store/pricing.actions";
import {Observable} from "rxjs";
import {PricingState} from "./store/pricing.reducer";

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
  mode: string | number = 'monthly';
  private readonly store: Store<PricingState> = inject(Store<PricingState>)
  readonly products$: Observable<Product[]> = this.store.select(getProducts());

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
