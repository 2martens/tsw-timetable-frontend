import {MessagesState} from "./messages.reducer";
import {createFeatureSelector} from "@ngrx/store";
import {showMessage} from "./messages.effects";
import {FunctionalEffect} from "@ngrx/effects";

export const messagesFeature = 'messages';

export const messagesEffects: Record<string, FunctionalEffect> = {
  showMessage
}

export const getMessagesFeatureState = createFeatureSelector<MessagesState>(
  messagesFeature
);
