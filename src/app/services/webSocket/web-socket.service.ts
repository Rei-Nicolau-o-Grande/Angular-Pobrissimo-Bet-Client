import { Injectable, inject } from '@angular/core';
// import { Client } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
// import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  // private stompClient!: Client;
  private walletSubject: Subject<any> = new Subject<any>();
  private cookieService = inject(CookieService);

  constructor() {
    // this.initializeWebSocketConnection();
  }

  // private initializeWebSocketConnection(): void {
  //   const serverUrl = 'http://localhost:8080/ws';
  //   const ws = new SockJS(serverUrl);
  //   // this.stompClient = over(ws);

  //   this.stompClient.onConnect = () => {
  //     const userId = this.cookieService.get('access_token'); // Substitua pelo ID do usuário autenticado
  //     this.stompClient.subscribe('/topic/my-wallet/' + userId, (message) => {
  //       if (message.body) {
  //         this.walletSubject.next(JSON.parse(message.body));
  //       }
  //     });
  //   };

  //   this.stompClient.activate();
  // }

  public getWalletUpdates(): Observable<any> {
    return this.walletSubject.asObservable();
  }
}
