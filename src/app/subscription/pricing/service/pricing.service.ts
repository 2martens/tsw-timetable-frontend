import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {catchError, map, Observable, of} from "rxjs";
import {User} from "../../../auth/model/user";
import {PaymentLocation} from "../model/payment-location";
import {ErrorService} from "../../../errors/error.service";
import {SubscriptionIntent} from "../../model/subscription-intent";

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private subscriptionURL = environment.backendURL + '/subscription';

  constructor(private readonly http: HttpClient,
              private readonly errorService: ErrorService) {
  }

  subscribe$(user: User, lookupKey: string): Observable<string> {
    const paymentLocation: PaymentLocation = {
      stripeURL: '/pricing'
    };

    if (environment.mockNetwork) {
      // do sth
      return of('/dashboard?state=success');
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
