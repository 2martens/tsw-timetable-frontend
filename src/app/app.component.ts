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
  homeOutline,
  homeSharp,
  logInOutline,
  logInSharp,
  logOutOutline,
  logOutSharp,
  readerOutline,
  readerSharp,
  shieldOutline,
  shieldSharp
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
  public appPages = [
    {title: $localize`Dashboard`, url: '', icon: 'home'},
    {title: $localize`Privacy Policy`, url: '/privacy-policy', icon: 'shield'},
    {title: $localize`Legal Notice`, url: '/legal-notice', icon: 'reader'},
  ];
  public accountPages = [
    {title: $localize`Logout`, url: '/logout', icon: 'log-out'},
  ];
  public loggedOutPages = [
    {title: $localize`Logout`, url: '/login', icon: 'log-in'},
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
    });
  }

}
