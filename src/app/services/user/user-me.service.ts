import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserMeResponse } from '../../model/user/UserMeResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserMeService {

  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  private API_URL = `${environment.api}/api/v1/users/me`;
  private JWT_TOKEN = this.cookieService.get('access_token');
  private HEADERS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    }),
  };

  public getUserMe(request: UserMeResponse): Observable<UserMeResponse> {
    return this.http.get<UserMeResponse>(
      this.API_URL,
      this.HEADERS
    );
  }
}
