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
