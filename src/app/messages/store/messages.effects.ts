import {Actions, createEffect, ofType} from "@ngrx/effects";
import {addMessageAction, addMessageFinishedAction} from "./messages.actions";
import {from, map, switchMap} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {ToastController} from "@ionic/angular";

@Injectable()
export class MessagesEffects {
  private actions$ = inject(Actions);
  showToast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addMessageAction),
      switchMap((action) => {
        return from(this.toastController.create({
          message: action.message.text,
          duration: 1500,
          position: 'bottom',
          positionAnchor: 'footer'
        }));
      }),
      switchMap((toast) => {
        return toast.present();
      }),
      map((_) => {
        return addMessageFinishedAction()
      })
    ));

  constructor(private toastController: ToastController) {
  }
}
