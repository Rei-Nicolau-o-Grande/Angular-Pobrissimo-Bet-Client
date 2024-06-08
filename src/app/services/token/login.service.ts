import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../../model/token/LoginRequest';
import { Observable } from 'rxjs';
import { TokenResponse } from '../../model/token/TokenResponse';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_URL = `${environment.api}/api/v1/token`;
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  public login(request: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API_URL}/login`, request)
  }

  public isLoggedIn(): boolean {
    const TOKEN = this.cookieService.check("access_token");
    return TOKEN ? true : false;
  }

}
