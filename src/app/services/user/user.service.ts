import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserMeResponse } from '../../model/user/UserMeResponse';
import { Observable } from 'rxjs';
import { UserRequest } from '../../model/user/UserRequest';

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

  public createUser(request: UserRequest): Observable<UserRequest> {
    return this.http.post<UserRequest>(
      this.API_URL,
      request
    );
  }

  public updateUser(request: UserRequest, userId: number): Observable<UserRequest> {
    return this.http.put<UserRequest>(
      `${this.API_URL}/${userId}`,
      request,
      this.HEADERS
    );
  }


}
