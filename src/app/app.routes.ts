import {Routes} from '@angular/router';

export const ROOT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import("./dashboard/dashboard.component").then(mod => mod.DashboardComponent),
    pathMatch: 'full',
  },
  {
    path: 'permission-denied',
    loadComponent: () => import("./permission-denied/permission-denied.component")
      .then(mod => mod.PermissionDeniedComponent)
  },
  {
    path: 'legal-notice',
    loadComponent: () => import("./legal-notice/legal-notice.component").then(mod => mod.LegalNoticeComponent)
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import("./privacy-policy/privacy-policy.component").then(mod => mod.PrivacyPolicyComponent)
  },
];
