import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyWallet } from '../../model/wallet/MyWallet';
import { Observable } from 'rxjs';
import { CreateTransaction } from '../../model/transaction/CreateTransaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

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

  public createTransaction(request: CreateTransaction, walletId: string): Observable<CreateTransaction> {
    return this.http.post<CreateTransaction>(
      `${this.API_URL}/${walletId}`,
      request,
      this.HEADERS
    );
  };

}
