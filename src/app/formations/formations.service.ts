import {Injectable} from '@angular/core';
import {Formation} from "./model/formation";
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MessageType} from "../messages/model/message-type";
import {MessagesService} from "../messages/messages.service";

@Injectable({
  providedIn: 'root'
})
export class FormationsService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private formationsURL = environment.backendURL + '/formation';

  constructor(private readonly http: HttpClient,
              private readonly messageService: MessagesService) {
  }

  fetchFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.formationsURL, this.httpOptions)
      .pipe(
        catchError(this.handleError<Formation[]>('fetchFormations', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      if (error.status == 0) {
        this.log(MessageType.UNKNOWN_ERROR);
      }
      if (error.status == 401) {
        this.log(MessageType.UNAUTHENTICATED);
      }
      if (error.status == 403) {
        this.log(MessageType.UNAUTHORIZED);
      }
      if (error.status == 500) {
        this.log(MessageType.INTERNAL_SERVER_ERROR);
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(type: MessageType) {
    this.messageService.logMessage('FormationsService', type);
  }
}
