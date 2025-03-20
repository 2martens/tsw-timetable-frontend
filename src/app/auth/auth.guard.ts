import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

import {AuthGuardData, createAuthGuard} from 'keycloak-angular';
import {inject} from '@angular/core';
import { Store } from '@ngrx/store';
import { loggedInAction, logInAction } from './store/auth.actions';
import { AuthService } from './service/auth.service';

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  authData: AuthGuardData
): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;

  const store = inject(Store<AuthService>);
  const requiredRoles = route.data['roles'];
  if (!requiredRoles) {
    const redirectUri = `${window.location.origin}${state.url}`;
    store.dispatch(logInAction({redirectUrl: redirectUri}));
    return false;
  }

  store.dispatch(loggedInAction());

  const hasRequiredRole = (role: string): boolean =>
    Object.values(grantedRoles.resourceRoles).some((roles) => roles.includes(role));

  if (authenticated && requiredRoles.every(hasRequiredRole)) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/permission-denied');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
