import {Routes} from '@angular/router';
import {AppAuthGuard} from "./auth/auth.guard";

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
    path: 'login',
    loadComponent: () => import("./login/login.component").then(mod => mod.LoginComponent)
  },
  {
    path: 'logout',
    loadComponent: () => import("./logout/logout.component").then(mod => mod.LogoutComponent),
    canActivate: [AppAuthGuard]
  },
  {
    path: '',
    loadComponent: () => import("./dashboard/dashboard.component").then(mod => mod.DashboardComponent),
    pathMatch: 'full',
  },
];
