import {APP_INITIALIZER, ApplicationConfig, isDevMode} from "@angular/core";
import {KeycloakBearerInterceptor, KeycloakService} from "keycloak-angular";
import {Location} from "@angular/common";
import {provideRouter, RouteReuseStrategy, withComponentInputBinding} from "@angular/router";
import {ROOT_ROUTES} from "./app.routes";
import {provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {provideAnimations} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideServiceWorker} from "@angular/service-worker";
import {environment} from "../environments/environment";
import {IonicRouteStrategy, provideIonicAngular} from "@ionic/angular/standalone";
import {MessagesEffects} from "./messages/store/messages.effects";
import {provideStoreDevtools} from "@ngrx/store-devtools";

function initializeKeycloak(keycloak: KeycloakService, locationService: Location) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloakURL,
        realm: environment.realm,
        clientId: environment.clientId,
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: `${window.location.origin}${locationService.prepareExternalUrl('/assets/silent-check-sso.html')}`,
        flow: "standard"
      },
      shouldAddToken: (request) => {
        const {url} = request;
        return url.startsWith(environment.backendURL);
      },
      loadUserProfileAtStartUp: true
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, Location],
    },
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    provideIonicAngular(),
    provideRouter(ROOT_ROUTES, withComponentInputBinding()),
    provideStore(),
    provideEffects([MessagesEffects]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectOutsideZone: true // If set to true, the connection is established outside the Angular zone for better performance
    }),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    KeycloakService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
}
