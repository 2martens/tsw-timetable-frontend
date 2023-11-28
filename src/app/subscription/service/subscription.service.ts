import {Injectable} from '@angular/core';
import {AuthService} from "../../auth/service/auth.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private static ACTIVE_PLAN = 'ACTIVE_PLAN';
  private static PERSONAL_PLAN = 'PERSONAL_PLAN';

  constructor(private readonly authService: AuthService) {
  }

  hasActiveSubscription$(): Observable<boolean> {
    return this.authService.getUser$().pipe(
      map(user => user.roles),
      map(roles => roles.includes(SubscriptionService.PERSONAL_PLAN))
    )
  }

  hasActivePlan$(): Observable<boolean> {
    return this.authService.getUser$().pipe(
      map(user => user.roles),
      map(roles => roles.includes(SubscriptionService.ACTIVE_PLAN))
    )
  }
}
