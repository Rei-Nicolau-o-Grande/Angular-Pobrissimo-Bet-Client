import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormAuthComponent } from '../form-auth/form-auth.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/token/login.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CookieService } from 'ngx-cookie-service';


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
export class HeaderComponent {
  private dialogService = inject(MatDialog);

  @Output() eventFormAuth: any = new EventEmitter();
  @Output() toggleSidenav = new EventEmitter<void>();

  onClick() {
    console.log('click hearder component');
    this.toggleSidenav.emit();
  }

  private loginService = inject(LoginService);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  public isUserMenuOpen: boolean = false;



  public handleOpenModal(isLoginOrCreateUser: boolean): void {
    this.dialogService.open(FormAuthComponent, {
      width: '700px',
      height: '400px',
      data: isLoginOrCreateUser
    });
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

}
