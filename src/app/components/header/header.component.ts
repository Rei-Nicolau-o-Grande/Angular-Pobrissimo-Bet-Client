import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormAuthComponent } from '../form-auth/form-auth.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/token/login.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CookieService } from 'ngx-cookie-service';
import { WalletService } from '../../services/wallet/wallet.service';
import { MyWallet } from '../../model/wallet/MyWallet';
import { FormTransactionComponent } from '../form-transaction/form-transaction.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule,
    CommonModule,
    MatMenuModule,
    MatTooltipModule, RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  private dialogService = inject(MatDialog);

  @Output() eventFormAuth: any = new EventEmitter();
  @Output() toggleSidenav = new EventEmitter<void>();

  onClick() {
    console.log('click hearder component');
    this.toggleSidenav.emit();
  }

  private loginService = inject(LoginService);
  private cookieService = inject(CookieService);
  private walletService = inject(WalletService);
  private router = inject(Router);
  public myWallet: MyWallet = {} as MyWallet;

  public isUserMenuOpen: boolean = false;

  public amountWallet: number = 0;


  public handleOpenModal(isLoginOrCreateUser: boolean): void {
    this.dialogService.open(FormAuthComponent, {
      width: '700px',
      height: '400px',
      data: isLoginOrCreateUser
    });
  }

  public handleOpenModalTransaction(): void {
    this.dialogService.open(FormTransactionComponent, {
      width: '700px',
      height: '400px'
    })
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  public sendEventFormAuth(event: boolean): void {
    this.eventFormAuth.emit(event);
  }

  public verifyUserIsLogged(): boolean {
    return this.loginService.isLoggedIn();
  }

  refresh(): void {
    window.location.reload();
  }

  public logout(): void {
    this.cookieService.delete("access_token");
    alert("Você saiu da sua conta!")
    this.router.navigate(['/']);
    this.refresh();
  }

  public getMyWalletAmount(): void {
    this.walletService.getWallet(this.myWallet)
    .subscribe( (response) => {
      this.amountWallet = response.amount;
    });
  }

  ngOnInit(): void {
    this.getMyWalletAmount();
  }

}
