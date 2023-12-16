import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Route} from "../model/route";
import {ErrorService} from "../../errors/error.service";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private routesURL = environment.backendURL + '/route';

  private knownRoutes: Map<string, Route> = new Map<string, Route>();
  private routes: Route[] = [];

  constructor(private readonly http: HttpClient,
              private readonly errorService: ErrorService) {
  }

  fetchRoutes(): Observable<Route[]> {
    if (environment.mockNetwork) {
      this.routes = JSON.parse(localStorage.getItem("routes") || '[]');
      this.routes.forEach(route => this.knownRoutes.set(route.id, route));
      return of(this.routes);
    }

    return this.http.get<Route[]>(this.routesURL, this.httpOptions)
      .pipe(
        catchError(this.errorService.handleError<Route[]>('Routes',
          'fetchRoutes', []))
      );
  }

  storeRoute(route: Route): Observable<Route> {
    if (environment.mockNetwork) {
      this.knownRoutes.set(route.id, route);
      this.storeRoutesInLocalStorage();
      return of(route);
    }

    return this.http.put<Route>(
      this.routesURL + '/' + encodeURIComponent(route.id),
      route,
      this.httpOptions
    ).pipe(
      catchError(this.errorService.handleError<Route>('Routes',
        'storeRoute', route))
    )
  }

  deleteRoute(route: Route): Observable<ArrayBuffer> {
    if (environment.mockNetwork) {
      this.knownRoutes.delete(route.id);
      this.storeRoutesInLocalStorage();
      return of(new ArrayBuffer(0));
    }

    return this.http.delete<ArrayBuffer>(
      this.routesURL + '/' + encodeURIComponent(route.id),
      this.httpOptions
    ).pipe(
      catchError(this.errorService.handleError<ArrayBuffer>('Route',
        'deleteRoute', new ArrayBuffer(0)))
    )
  }

  private storeRoutesInLocalStorage() {
    this.routes = Array.from(this.knownRoutes.values());
    localStorage.setItem("routes", JSON.stringify(this.routes));
  }
}
