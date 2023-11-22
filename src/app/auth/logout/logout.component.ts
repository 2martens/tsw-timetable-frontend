import {Component, OnInit} from '@angular/core';
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {Location} from "@angular/common";
import {AuthState} from "../store/auth.reducer";
import {Store} from "@ngrx/store";
import {logOutAction} from "../store/auth.actions";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
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
export class LogoutComponent implements OnInit {

  constructor(private readonly location: Location,
              private readonly store: Store<AuthState>) {
  }

  ngOnInit() {
    const redirectUrl = `${window.location.origin}${this.location.prepareExternalUrl('')}`;
    this.store.dispatch(logOutAction({redirectUrl}))
  }
}
