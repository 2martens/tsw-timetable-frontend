import {Routes} from '@angular/router';
import {AppAuthGuard} from "./auth/auth.guard";
import {provideState} from "@ngrx/store";
import {featureStateName as formationsFeature, formationsEffects} from "./formations/store";
import {provideEffects} from "@ngrx/effects";
import {formationsReducer} from "./formations/store/formations.reducer";
import {pricingReducer} from "./pricing/store/pricing.reducer";
import {featureStateName as pricingFeature, pricingEffects} from "./pricing/store";

export const ROOT_ROUTES: Routes = [
  {
    path: 'permission-denied',
    loadComponent: () => import("./permission-denied/permission-denied.component")
      .then(mod => mod.PermissionDeniedComponent),
  },
  {
    path: 'legal-notice',
    loadComponent: () => import("./legal-notice/legal-notice.component").then(mod => mod.LegalNoticeComponent)
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import("./privacy-policy/privacy-policy.component").then(mod => mod.PrivacyPolicyComponent)
  },
  {
    path: 'pricing',
    loadComponent: () => import("./pricing/pricing.component").then(mod => mod.PricingComponent),
    providers: [
      provideState(pricingFeature, pricingReducer),
      provideEffects(pricingEffects)
    ],
  },
  {
    path: 'login',
    loadComponent: () => import("./auth/login/login.component").then(mod => mod.LoginComponent)
  },
  {
    path: 'logout',
    loadComponent: () => import("./auth/logout/logout.component").then(mod => mod.LogoutComponent),
    canActivate: [AppAuthGuard]
  },
  {
    path: 'account',
    loadComponent: () => import("./auth/account/account.component").then(mod => mod.AccountComponent),
    canActivate: [AppAuthGuard]
  },
  {
    path: 'routes',
    loadComponent: () => import("./routes/routes.component").then(mod => mod.RoutesComponent),
    canActivate: [AppAuthGuard]
  },
  {
    path: 'timetables',
    loadComponent: () => import("./timetables/timetables.component").then(mod => mod.TimetablesComponent),
    canActivate: [AppAuthGuard]
  },
  {
    path: 'formations',
    loadComponent: () => import("./formations/formations.component").then(mod => mod.FormationsComponent),
    canActivate: [AppAuthGuard],
    providers: [
      provideState(formationsFeature, formationsReducer),
      provideEffects(formationsEffects)
    ],
  },
  {
    path: '',
    loadComponent: () => import("./dashboard/dashboard.component").then(mod => mod.DashboardComponent),
    pathMatch: 'full',
    providers: [
      provideState(formationsFeature, formationsReducer),
      provideEffects(formationsEffects)
    ],
  },
];
