import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, of} from "rxjs";
import {ErrorService} from "../../errors/error.service";
import {Timetable} from "../model/timetable";

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private timetablesURL = environment.backendURL + '/timetables';

  private knownTimetables: Map<string, Timetable> = new Map<string, Timetable>();
  private timetables: Timetable[] = [];

  constructor(private readonly http: HttpClient,
              private readonly errorService: ErrorService) {
  }

  fetchTimetables(userId: string): Observable<Timetable[]> {
    if (environment.mockNetwork || environment.fallbackToMock) {
      this.timetables = JSON.parse(localStorage.getItem("timetables") || '[]');
      this.timetables.forEach(timetable => this.knownTimetables.set(timetable.id, timetable));
      if (environment.mockNetwork) {
        return of(this.timetables);
      }
    }

    return this.http.get<Timetable[]>(this.timetablesURL + '/' + encodeURIComponent(userId) + '/', this.httpOptions)
      .pipe(
        catchError(this.errorService.handleError<Timetable[]>('Timetables',
          'fetchTimetables', environment.fallbackToMock ? this.timetables : []))
      );
  }

  storeTimetable(timetable: Timetable, userId: string): Observable<Timetable> {
    if (environment.mockNetwork || environment.fallbackToMock) {
      this.knownTimetables.set(timetable.id, timetable);
      this.storeRoutesInLocalStorage();
      if (environment.mockNetwork) {
        return of(timetable);
      }
    }

    return this.http.put<Timetable>(
      this.timetablesURL + '/' + encodeURIComponent(userId) + '/' + encodeURIComponent(timetable.id),
      timetable,
      this.httpOptions
    ).pipe(
      catchError(this.errorService.handleError<Timetable>('Timetables',
        'storeTimetable', timetable))
    )
  }

  deleteTimetable(timetable: Timetable, userId: string): Observable<ArrayBuffer> {
    if (environment.mockNetwork || environment.fallbackToMock) {
      this.knownTimetables.delete(timetable.id);
      this.storeRoutesInLocalStorage();
      if (environment.mockNetwork) {
        return of(new ArrayBuffer(0));
      }
    }

    return this.http.delete<ArrayBuffer>(
      this.timetablesURL + '/' + encodeURIComponent(userId) + '/' + encodeURIComponent(timetable.id),
      this.httpOptions
    ).pipe(
      catchError(this.errorService.handleError<ArrayBuffer>('Timetables',
        'deleteTimetable', new ArrayBuffer(0)))
    )
  }

  private storeRoutesInLocalStorage() {
    this.timetables = Array.from(this.knownTimetables.values());
    localStorage.setItem("timetables", JSON.stringify(this.timetables));
  }
}
