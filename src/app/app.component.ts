import {AsyncPipe, NgFor} from '@angular/common';
import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {
  cashOutline,
  cashSharp,
  cubeOutline,
  cubeSharp,
  homeOutline,
  homeSharp,
  logInOutline,
  logInSharp,
  logOutOutline,
  logOutSharp,
  mapOutline,
  mapSharp,
  personOutline,
  personSharp,
  readerOutline,
  readerSharp,
  shieldOutline,
  shieldSharp,
  timeOutline,
  timeSharp,
  trainOutline,
  trainSharp
} from 'ionicons/icons';
import {map, Observable} from "rxjs";
import {AuthService} from "./auth/service/auth.service";
import {SubscriptionService} from "./subscription/service/subscription.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList,
    IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, NgFor, AsyncPipe,
    IonItemDivider, IonHeader, IonToolbar, IonTitle],
})
export class AppComponent {
  public activePlanPages = [
    {title: $localize`Dashboard`, url: '', icon: 'home'},
    {title: $localize`Pricing`, url: '/pricing', icon: 'cash'},
    {title: $localize`Routes`, url: '/routes', icon: 'map'},
    {title: $localize`Timetables`, url: '/timetables', icon: 'time'},
    {title: $localize`Formations`, url: '/formations', icon: 'train'},
    {title: $localize`Privacy Policy`, url: '/privacy-policy', icon: 'shield'},
    {title: $localize`Legal Notice`, url: '/legal-notice', icon: 'reader'},
  ];
  public accountPages = [
    {title: $localize`Account Settings`, url: '/account', icon: 'person'},
    {title: $localize`Logout`, url: '/logout', icon: 'log-out'},
  ];
  public noActivePlanPages = [
    {title: $localize`Overview`, url: '', icon: 'home'},
    {title: $localize`Features`, url: '/features', icon: 'cube'},
    {title: $localize`Pricing`, url: '/pricing', icon: 'cash'},
    {title: $localize`Privacy Policy`, url: '/privacy-policy', icon: 'shield'},
    {title: $localize`Legal Notice`, url: '/legal-notice', icon: 'reader'},
  ]
  isLoggedIn$: Observable<boolean>;
  username$: Observable<string>;
  hasActivePlan$: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly subscriptionService: SubscriptionService,
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$();
    this.username$ = this.authService.getUser$().pipe(
      map(user => user.username)
    );
    this.hasActivePlan$ = this.subscriptionService.hasActivePlan$();
    addIcons({
      homeOutline,
      homeSharp,
      logInOutline,
      logInSharp,
      logOutOutline,
      logOutSharp,
      shieldOutline,
      shieldSharp,
      readerOutline,
      readerSharp,
      cashOutline,
      cashSharp,
      cubeOutline,
      cubeSharp,
      personOutline,
      personSharp,
      mapOutline,
      mapSharp,
      timeOutline,
      timeSharp,
      trainOutline,
      trainSharp,
    });
  }

}
