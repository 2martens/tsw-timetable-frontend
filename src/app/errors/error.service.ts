import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpStatusCode} from "@angular/common/http";
import {MessageType} from "../messages/model/message-type";
import {addMessageAction} from "../messages/store/messages.actions";
import {MessagesState} from "../messages/store/messages.reducer";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private static UNAUTHENTICATED = $localize`You are not logged in which prevents data from loading`;
  private static UNAUTHORIZED = $localize`You don't have sufficient authorization to view the data`;
  private static INTERNAL_SERVER_ERROR = $localize`An internal server error occurred. Sorry for the inconvenience.`;
  private static UNKNOWN_ERROR = $localize`An unknown error occurred. Sorry for the inconvenience.`;
  private static SERVICE_WORKER_ERROR = $localize`An error with the service worker occurred. Please reload the page.`


  constructor(private readonly store: Store<MessagesState>) {
  }

  handleError<T>(component: string, operation: string, result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(component + '(' + operation + '): ' + error); // log to console instead

      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.logMessage(component, operation, MessageType.UNAUTHENTICATED);
          break;
        case HttpStatusCode.Forbidden:
          this.logMessage(component, operation, MessageType.UNAUTHORIZED);
          break;
        case HttpStatusCode.InternalServerError:
          this.logMessage(component, operation, MessageType.INTERNAL_SERVER_ERROR);
          break;
        default:
          this.logMessage(component, operation, MessageType.UNKNOWN_ERROR);
          break;
      }

      return of(result as T);
    }
  }

  private logMessage(component: string, operation: string, type: MessageType, details?: string) {
    let text = component + '(' + operation + '): ';
    switch (type) {
      case MessageType.UNAUTHENTICATED:
        text += ErrorService.UNAUTHENTICATED;
        break;
      case MessageType.UNAUTHORIZED:
        text += ErrorService.UNAUTHORIZED;
        break;
      case MessageType.INTERNAL_SERVER_ERROR:
        text += ErrorService.INTERNAL_SERVER_ERROR;
        break;
      case MessageType.SERVICE_WORKER_ERROR:
        text += ErrorService.SERVICE_WORKER_ERROR;
        if (details != undefined) {
          text += "Details: " + details;
        }
        break;
      default:
        text += ErrorService.UNKNOWN_ERROR;
    }

    this.store.dispatch(addMessageAction({message: {text, color: 'warning'}}))
  }
}
