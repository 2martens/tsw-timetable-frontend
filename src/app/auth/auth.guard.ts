import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';
import {Injectable} from '@angular/core';
import {Location} from "@angular/common";
import {AuthService} from "./service/auth.service";
import {Store} from "@ngrx/store";
import {loggedInAction, logInAction} from "./store/auth.actions";

@Injectable({
  providedIn: 'root',
})
export class AppAuthGuard extends KeycloakAuthGuard {

  constructor(protected override readonly router: Router,
              protected readonly keycloak: KeycloakService,
              private readonly location: Location,
              private readonly store: Store<AuthService>) {
    super(router, keycloak);
  }

  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated || this.keycloak.isTokenExpired()) {
      const redirectUri = `${window.location.origin}${this.location.prepareExternalUrl(state.url)}`;
      this.store.dispatch(logInAction({redirectUrl: redirectUri}));
      // await this.keycloak.login({
      //   redirectUri: redirectUri,
      // });
      return false;
    }

    this.store.dispatch(loggedInAction());

    // Get the roles required from the route.
    const requiredRoles = route.data['roles'];

    let granted: boolean;

    // Allow the user to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      granted = true;
      return granted;
    }

    // Allow the user to proceed if all the required roles are present.
    granted = requiredRoles.every((role) => this.roles.includes(role));

    // Routing user into permission denied view if they don't have necessary roles.
    if (!granted) {
      await this.router.navigate(['permission-denied']);
    }

    return granted;
  }

}
