import {Injectable} from '@angular/core';
import {BackendUser, User} from "../model/user";
import {catchError, map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ErrorService} from "../../errors/error.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private usersURL = environment.backendURL + '/users';

  constructor(private readonly http: HttpClient,
              private readonly errorService: ErrorService) {
  }

  storeUser(user: User): Observable<User> {
    return this.http.put<BackendUser>(
      this.usersURL + '/' + encodeURIComponent(user.id),
      {
        id: user.id,
        name: user.username,
        email: user.email
      },
      this.httpOptions
    ).pipe(
      map((receivedUser): User => {
        return {
          id: receivedUser.id,
          username: receivedUser.name,
          email: receivedUser.email,
          roles: user.roles
        }
      }),
      catchError(this.errorService.handleError<User>('Users',
        'storeUser', user))
    );
  }
}
