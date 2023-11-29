import {Component, OnInit} from '@angular/core';
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {Location} from "@angular/common";
import {AuthService} from "../service/auth.service";
import {Store} from "@ngrx/store";
import {logInAction} from "../store/auth.actions";

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

  constructor(private readonly store: Store<AuthService>,
              private readonly location: Location) {
  }

  ngOnInit() {
    this.store.dispatch(logInAction({
      redirectUrl: `${window.location.origin}${this.location.prepareExternalUrl('/dashboard')}`
    }));
  }

}
