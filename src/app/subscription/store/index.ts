import {FunctionalEffect} from "@ngrx/effects";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SubscriptionState} from "./subscription.reducer";
import {subscribe} from "./subscription.effects";

export const subscriptionFeature = 'subscription';


export const subscriptionEffects: Record<string, FunctionalEffect> = {
  subscribe
}

export const getSubscriptionFeatureState = createFeatureSelector<SubscriptionState>(
  subscriptionFeature
);

export const getProducts = () => createSelector(
  getSubscriptionFeatureState,
  (state: SubscriptionState) => state.products
)
