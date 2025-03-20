import {Injectable} from '@angular/core';
import {AuthState} from "../store/auth.reducer";
import {Store} from "@ngrx/store";
import {defaultIfEmpty, filter, map, Observable, of, share, switchMap, tap, using} from "rxjs";
import {getUser, isLoggedIn, needsUserData} from "../store";
import {User} from "../model/user";
import Keycloak from 'keycloak-js';
import {loggedInAction, loggedInFinishedAction} from "../store/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly store: Store<AuthState>,
              private readonly keycloak: Keycloak) {
  }

  isLoggedIn$(): Observable<boolean> {
    return using(
      () => this.determineLogInStatus$().subscribe(),
      () => this.store.select(isLoggedIn())
    )
  }

  private determineLogInStatus$(): Observable<boolean> {
    return of(this.keycloak.authenticated).pipe(
      filter(isLoggedIn => isLoggedIn !== undefined && isLoggedIn),
      tap(_ => this.store.dispatch(loggedInAction())),
      defaultIfEmpty(false),
      share(),
    )
  }

  getUser$(): Observable<User> {
    return using(
      () => this.loadUser$().subscribe(),
      () => this.store.select(getUser())
    )
  }

  private loadUser$(): Observable<User> {
    return this.store.select(needsUserData()).pipe(
      filter(needsUserData => needsUserData),
      switchMap(() => this.keycloak.loadUserProfile()),
      map((userProfile) => {
        const roles = (this.keycloak.realmAccess?.roles ?? []).concat(this.keycloak.resourceAccess?.['tsw-timetable-frontend']?.roles ?? []);
        return {
          id: userProfile.id || '',
          username: userProfile.username || '',
          email: userProfile.email || '',
          roles: roles
        };
      }),
      tap((user: User) => this.store.dispatch(loggedInFinishedAction({user}))),
      share()
    );
  }
}
