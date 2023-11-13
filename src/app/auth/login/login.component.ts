import {Component, OnInit} from '@angular/core';
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {KeycloakService} from "keycloak-angular";
import {Location} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar
  ],
  standalone: true
})
export class LoginComponent implements OnInit {

  constructor(private readonly keycloakService: KeycloakService,
              private readonly location: Location) {
  }

  async ngOnInit() {
    await this.keycloakService.login({
      redirectUri: `${window.location.origin}${this.location.prepareExternalUrl('')}`
    });
  }

}
