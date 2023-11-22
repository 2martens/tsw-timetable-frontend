import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {catchError, map, Observable, of} from "rxjs";
import {User} from "../../../auth/model/user";
import {PaymentLocation} from "../model/payment-location";
import {ErrorService} from "../../../errors/error.service";
import {SubscriptionIntent} from "../../model/subscription-intent";
import {Store} from "@ngrx/store";
import {addMessageAction} from "../../../messages/store/messages.actions";
import {Message} from "../../../messages/model/message";

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private subscriptionURL = environment.backendURL + '/subscription';

  constructor(private readonly http: HttpClient,
              private readonly errorService: ErrorService,
              private readonly store: Store<unknown>) {
  }

  subscribe$(user: User, lookupKey: string): Observable<string> {
    const paymentLocation: PaymentLocation = {
      stripeURL: '/pricing'
    };

    if (environment.mockNetwork) {
      const message: Message = {
        text: $localize`The subscription was not successfully created.`,
        color: 'warning'
      }
      this.store.dispatch(addMessageAction({message}))
      // do sth
      return of(paymentLocation.stripeURL);
    }
    const body: SubscriptionIntent = {
      user,
      lookupKey
    };

    return this.http.post<PaymentLocation>(
      this.subscriptionURL,
      body,
      this.httpOptions
    ).pipe(
      catchError(this.errorService.handleError<PaymentLocation>('Pricing',
        'subscribe', paymentLocation)),
      map(paymentLocation => paymentLocation.stripeURL),
    )
  }
}
