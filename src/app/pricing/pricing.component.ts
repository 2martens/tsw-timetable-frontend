import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {IonContent} from "@ionic/angular/standalone";
import {SafePipe} from "../safe.pipe";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
  standalone: true,
  imports: [IonContent, SafePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PricingComponent {

  pricingTableId = "prctbl_1OBwBiB0O150WkrEBWLbMFfX";
  publishableKey = "pk_live_2eOLaGr7ItE7d4xlB4HWrKp800JyKpBWcV";
  uuid = Math.random().toString(16).slice(2);


  constructor() {
  }

  get url(): string {
    return 'https://js.stripe.com/v3/pricing-table-app.html?prctbl_id='
      + this.pricingTableId
      + '&pk='
      + this.publishableKey
      + '&uuid='
      + this.uuid
      + '&lo=undefined&customerEmail=undefined';
  }

}
