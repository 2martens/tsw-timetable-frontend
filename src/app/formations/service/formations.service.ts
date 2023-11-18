import {Injectable} from '@angular/core';
import {Formation} from "../model/formation";
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {MessageType} from "../../messages/model/message-type";
import {MessagesService} from "../../messages/messages.service";

@Injectable({
  providedIn: 'root'
})
export class FormationsService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private formationsURL = environment.backendURL + '/formation';

  private knownFormations: Map<string, Formation> = new Map<string, Formation>();
  private formations: Formation[] = [];

  constructor(private readonly http: HttpClient,
              private readonly messageService: MessagesService) {
  }

  fetchFormations(): Observable<Formation[]> {
    if (environment.mockNetwork) {
      this.formations = JSON.parse(localStorage.getItem("formations") || '[]');
      return of(this.formations);
    }

    return this.http.get<Formation[]>(this.formationsURL, this.httpOptions)
      .pipe(
        catchError(this.handleError<Formation[]>('fetchFormations', []))
      );
  }

  storeFormation(formation: Formation): Observable<Formation> {
    if (environment.mockNetwork) {
      this.knownFormations.set(formation.id, formation);
      this.storeFormationsInLocalStorage();
      return of(formation);
    }

    return this.http.put<Formation>(
      this.formationsURL + '/' + encodeURIComponent(formation.id),
      formation,
      this.httpOptions
    ).pipe(
      catchError(this.handleError<Formation>('storeFormation', formation))
    )
  }

  deleteFormation(formation: Formation): Observable<ArrayBuffer> {
    if (environment.mockNetwork) {
      this.knownFormations.delete(formation.id);
      this.storeFormationsInLocalStorage();
      return of(new ArrayBuffer(0));
    }

    return this.http.delete<ArrayBuffer>(
      this.formationsURL + '/' + encodeURIComponent(formation.id),
      this.httpOptions
    ).pipe(
      catchError(this.handleError<ArrayBuffer>('deleteFormation', new ArrayBuffer(0)))
    )
  }

  private storeFormationsInLocalStorage() {
    this.formations = Array.from(this.knownFormations.values());
    localStorage.setItem("formations", JSON.stringify(this.formations));
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
      console.error(operation + ': ' + error); // log to console instead

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
