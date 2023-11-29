import {FunctionalEffect} from "@ngrx/effects";
import {redirect} from "./redirect.effects";

export const redirectFeature = 'redirect';

export const redirectEffects: Record<string, FunctionalEffect> = {
  redirect
}
