import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyWallet } from '../../model/wallet/MyWallet';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  private API_URL = `${environment.api}/api/v1/wallet`;
  private JWT_TOKEN = this.cookieService.get('access_token');
  private HEADERS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    }),
  };

  public getWallet(): Observable<MyWallet> {
    return this.http.get<MyWallet>(
      `${this.API_URL}/my-wallet`,
      this.HEADERS
    );
  }
}
