import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ErrorService} from "../../errors/error.service";
import {BehaviorSubject, catchError, Observable, of, share, tap} from "rxjs";
import {Station} from "../model/station";
import {Country} from "../model/country";

@Injectable({
  providedIn: 'root'
})
export class StationService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private stationsURL = environment.backendURL + '/stations';
  private lastFetch: BehaviorSubject<Station[]> = new BehaviorSubject<Station[]>([]);
  private knownStations: Map<string, Station> = new Map<string, Station>();
  private stations: Station[] = [];
  private fetchedStations: Record<string, Record<string, Station[]> | undefined> = {}

  constructor(private readonly http: HttpClient,
              private readonly errorService: ErrorService) {
  }

  getStations$(country: Country, pattern: string): Observable<Station[]> {
    const doesNotNeedStations = this.fetchedStations[country.code] != null
      && this.fetchedStations[country.code]![pattern] != null;
    if (doesNotNeedStations) {
      return of(this.fetchedStations[country.code]![pattern]);
    } else {
      this.fetchStations$(country, pattern)
        .subscribe((stations) => this.lastFetch.next(stations));
    }

    return this.lastFetch.asObservable();
  }

  private fetchStations$(country: Country, pattern: string): Observable<Station[]> {
    if (environment.mockNetwork || environment.fallbackToMock) {
      this.stations = JSON.parse(localStorage.getItem("stations") || '[]');
      this.stations.forEach(station => this.knownStations.set(station.id, station));
      if (environment.mockNetwork) {
        return of(this.stations);
      }
    }

    const url = this.stationsURL + "/?country=" + country.code + "&name=" + pattern;
    return this.http.get<Station[]>(url, this.httpOptions)
      .pipe(
        catchError(this.errorService.handleError<Station[]>('Stations',
          'fetchStations', environment.fallbackToMock ? this.stations : [])),
        tap((stations: Station[]) => {
          if (this.fetchedStations[country.code] == null) {
            this.fetchedStations[country.code] = {};
          }
          this.fetchedStations[country.code]![pattern] = stations;
        }),
        share(),
      );
  }
}
