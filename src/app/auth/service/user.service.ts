import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {catchError, Observable} from "rxjs";
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
    return this.http.put<User>(
      this.usersURL + '/' + encodeURIComponent(user.id),
      user,
      this.httpOptions
    ).pipe(
      catchError(this.errorService.handleError<User>('Users',
        'storeUser', user))
    );
  }
}
