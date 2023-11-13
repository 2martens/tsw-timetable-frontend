import {AsyncPipe, NgFor, NgIf} from '@angular/common';
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
import {KeycloakService} from "keycloak-angular";
import {from, Observable, of, switchMap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList,
    IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, NgIf, NgFor, AsyncPipe, IonItemDivider, IonHeader, IonToolbar, IonTitle],
})
export class AppComponent {
  public loggedInPages = [
    {title: $localize`Dashboard`, url: '', icon: 'home'},
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
  public loggedOutPages = [
    {title: $localize`Overview`, url: '', icon: 'home'},
    {title: $localize`Features`, url: '/features', icon: 'cube'},
    {title: $localize`Pricing`, url: '/pricing', icon: 'cash'},
    {title: $localize`Privacy Policy`, url: '/privacy-policy', icon: 'shield'},
    {title: $localize`Legal Notice`, url: '/legal-notice', icon: 'reader'},
  ]
  public isLoggedIn$: Observable<boolean>;
  public username$: Observable<string>;

  constructor(
    private keycloakService: KeycloakService
  ) {
    this.isLoggedIn$ = from(this.keycloakService.isLoggedIn());
    this.username$ = this.isLoggedIn$.pipe(
      switchMap(loggedIn => {
        if (loggedIn) {
          return of(this.keycloakService.getUsername());
        } else {
          return of('');
        }
      })
    )
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
