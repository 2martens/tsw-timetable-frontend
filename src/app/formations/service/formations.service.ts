import {Injectable} from '@angular/core';
import {Formation} from "../model/formation";
import {catchError, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ErrorService} from "../../errors/error.service";

@Injectable({
  providedIn: 'root'
})
export class FormationsService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private formationsURL = environment.backendURL + '/formations';

  private knownFormations: Map<string, Formation> = new Map<string, Formation>();
  private formations: Formation[] = [];

  constructor(private readonly http: HttpClient,
              private readonly errorService: ErrorService) {
  }

  fetchFormations(userId: string): Observable<Formation[]> {
    if (environment.mockNetwork || environment.fallbackToMock) {
      this.formations = JSON.parse(localStorage.getItem("formations") || '[]');
      this.formations.forEach(formation => this.knownFormations.set(formation.id, formation));
    }

    return this.http.get<Formation[]>(this.formationsURL + '/' + encodeURIComponent(userId) + '/', this.httpOptions)
      .pipe(
        catchError(this.errorService.handleError<Formation[]>('Formations',
          'fetchFormations', environment.fallbackToMock ? this.formations : []))
      );
  }

  storeFormation(formation: Formation, userId: string): Observable<Formation> {
    if (environment.mockNetwork || environment.fallbackToMock) {
      this.knownFormations.set(formation.id, formation);
      this.storeFormationsInLocalStorage();
      if (environment.mockNetwork) {
        return of(formation);
      }
    }

    return this.http.put<Formation>(
      this.formationsURL + '/' + encodeURIComponent(userId) + '/' + encodeURIComponent(formation.id),
      formation,
      this.httpOptions
    ).pipe(
      catchError(this.errorService.handleError<Formation>('Formations',
        'storeFormation', formation))
    )
  }

  deleteFormation(formation: Formation, userId: string): Observable<ArrayBuffer> {
    if (environment.mockNetwork || environment.fallbackToMock) {
      this.knownFormations.delete(formation.id);
      this.storeFormationsInLocalStorage();
      if (environment.mockNetwork) {
        return of(new ArrayBuffer(0));
      }
    }

    return this.http.delete<ArrayBuffer>(
      this.formationsURL + '/' + encodeURIComponent(userId) + '/' + encodeURIComponent(formation.id),
      this.httpOptions
    ).pipe(
      catchError(this.errorService.handleError<ArrayBuffer>('Formation',
        'deleteFormation', new ArrayBuffer(0)))
    )
  }

  private storeFormationsInLocalStorage() {
    this.formations = Array.from(this.knownFormations.values());
    localStorage.setItem("formations", JSON.stringify(this.formations));
  }
}
