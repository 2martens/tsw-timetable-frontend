import {FunctionalEffect} from "@ngrx/effects";
import {subscribe} from "./pricing.effects";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PricingState} from "./pricing.reducer";

export const pricingFeature = 'pricing';


export const pricingEffects: Record<string, FunctionalEffect> = {
  subscribe: subscribe
}

export const getPricingFeatureState = createFeatureSelector<PricingState>(
  pricingFeature
);

export const getProducts = () => createSelector(
  getPricingFeatureState,
  (state: PricingState) => state.products
)
