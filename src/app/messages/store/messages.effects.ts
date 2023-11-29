import {Actions, createEffect, ofType} from "@ngrx/effects";
import {addMessageAction, addMessageFinishedAction} from "./messages.actions";
import {from, map, switchMap} from "rxjs";
import {inject} from "@angular/core";
import {ToastController} from "@ionic/angular";

export const showMessage = createEffect((
    actions$ = inject(Actions),
    toastController: ToastController = inject(ToastController),
  ) => {
    return actions$.pipe(
      ofType(addMessageAction),
      switchMap((action) => {
        return from(toastController.create({
          color: action.message.color,
          message: action.message.text,
          duration: action.message.duration || 1500,
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
    )
  },
  {functional: true})
