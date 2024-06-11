import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserMeResponse } from '../../model/user/UserMeResponse';
import { Observable } from 'rxjs';
import { CreateUserRequest } from '../../model/user/CreateUserRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  private API_URL = `${environment.api}/api/v1/users`;
  private JWT_TOKEN = this.cookieService.get('access_token');
  private HEADERS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    }),
  };

  public getUserMe(request: UserMeResponse): Observable<UserMeResponse> {
    return this.http.get<UserMeResponse>(
      `${this.API_URL}/me`,
      this.HEADERS
    );
  }

  public createUser(request: CreateUserRequest): Observable<CreateUserRequest> {
    return this.http.post<CreateUserRequest>(
      this.API_URL,
      request
    );
  }
}
