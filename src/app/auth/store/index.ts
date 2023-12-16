import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./auth.reducer";
import {FunctionalEffect} from "@ngrx/effects";
import {logIn, logOut, storeUser} from "./auth.effects";

export const authFeature = 'auth';

export const authEffects: Record<string, FunctionalEffect> = {
  logIn,
  logOut,
  storeUser
}

export const getAuthFeatureState = createFeatureSelector<AuthState>(
  authFeature
);

export const isLoggedIn = () => createSelector(
  getAuthFeatureState,
  (state: AuthState) => state.loggedIn
);

export const needsUserData = () => createSelector(
  getAuthFeatureState,
  (state: AuthState) => state.needsUserData
);

export const getUser = () => createSelector(
  getAuthFeatureState,
  (state: AuthState) => state.user
);
