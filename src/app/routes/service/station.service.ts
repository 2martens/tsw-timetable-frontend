import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ErrorService} from "../../errors/error.service";
import {catchError, Observable, of} from "rxjs";
import {Route} from "../model/route";
import {Station} from "../model/station";

@Injectable({
  providedIn: 'root'
})
export class StationService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private stationsURL = environment.backendURL + '/station';

  private knownStations: Map<string, Station> = new Map<string, Station>();
  private stations: Station[] = [];

  constructor(private readonly http: HttpClient,
              private readonly errorService: ErrorService) {
  }

  fetchStations(): Observable<Station[]> {
    if (environment.mockNetwork) {
      this.stations = JSON.parse(localStorage.getItem("stations") || '[]');
      return of(this.stations);
    }

    return this.http.get<Route[]>(this.stationsURL, this.httpOptions)
      .pipe(
        catchError(this.errorService.handleError<Route[]>('Routes',
          'fetchStations', []))
      );
  }
}
