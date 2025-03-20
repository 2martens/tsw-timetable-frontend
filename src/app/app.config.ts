import {ApplicationConfig, isDevMode, provideZoneChangeDetection} from "@angular/core";
import {createInterceptorCondition, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, IncludeBearerTokenCondition, includeBearerTokenInterceptor, provideKeycloak} from "keycloak-angular";
import {provideRouter, RouteReuseStrategy, withComponentInputBinding} from "@angular/router";
import {ROOT_ROUTES} from "./app.routes";
import {provideState, provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import {provideServiceWorker} from "@angular/service-worker";
import {environment} from "../environments/environment";
import {IonicRouteStrategy, provideIonicAngular} from "@ionic/angular/standalone";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {authEffects, authFeature} from "./auth/store";
import {authReducer} from "./auth/store/auth.reducer";
import {messagesEffects, messagesFeature} from "./messages/store";
import {messagesReducer} from "./messages/store/messages.reducer";
import {redirectEffects} from "./redirect/store";

const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(http:\/\/localhost:12100|https:\/\/api\.2martens\.de)(\/.*)?$/i,
  bearerPrefix: 'Bearer'
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloak({
      config: {
        url: environment.keycloakURL,
        realm: environment.realm,
        clientId: environment.clientId,
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${window.location.origin}/assets/silent-check-sso.html`,
        flow: "standard"
      }
    }),
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    provideIonicAngular(),
    provideRouter(ROOT_ROUTES, withComponentInputBinding()),
    provideStore(),
    provideState(messagesFeature, messagesReducer),
    provideState(authFeature, authReducer),
    provideEffects(messagesEffects, authEffects, redirectEffects),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: false // If set to true, the connection is established outside the Angular zone for better performance
    }),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([includeBearerTokenInterceptor])),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [urlCondition] // <-- Note that multiple conditions might be added.
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
}
