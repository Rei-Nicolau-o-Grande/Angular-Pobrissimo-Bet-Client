import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/token/login.service';
import { LoginRequest } from '../../model/token/LoginRequest';
import { Subject, takeUntil } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { UserRequest } from '../../model/user/UserRequest';

@Component({
  selector: 'app-form-auth',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './form-auth.component.html',
  styleUrl: './form-auth.component.scss'
})
export class FormAuthComponent implements OnInit, OnDestroy {

  private dialogRef = inject(MatDialogRef<HeaderComponent>);
  private matDialogData = inject(MAT_DIALOG_DATA);
  private loginService = inject(LoginService);
  private userService = inject(UserService);
  private coockieService = inject(CookieService);
  private router = inject(Router);

  private destroy$ = new Subject<void>();

  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  public formLoginOrCreateUser: boolean = true;

  public formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  public formCreateUser = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.formLoginOrCreateUser = this.matDialogData;
  }

  public onSubmitLoginForm(): void {
    if (this.formLogin.valid && this.formLogin.value) {
      this.loginService.login(this.formLogin.value as LoginRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          const expirationDate = new Date(response?.expiresIn);
          this.coockieService.set('access_token', response?.accessToken, expirationDate);
          this.formLogin.reset();
          this.handleCloseModal();
          this.router.navigate(['/']);

          alert("Logado com sucesso!");
          this.refresh();
        }, error: (error) => {
          alert(error.error.message);
        }
      })
    };
  }

  public onSubmitCreateUserForm(): void {
    if (this.formCreateUser.valid && this.formCreateUser.value) {
      this.userService.createUser(this.formCreateUser.value as UserRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.formCreateUser.reset();
          this.changeFormLoginOrCreateUser();
          alert("Usuário criado com sucesso!");
        }, error: (error) => {
          alert(error.error.message);
        }
      });
    }
  }

  public changeFormLoginOrCreateUser(): void {
    this.formLogin.reset();
    this.formCreateUser.reset();
    this.formLoginOrCreateUser = !this.formLoginOrCreateUser;
  }

  public handleCloseModal(): void {
    this.dialogRef.close();
  }

  public receiveEventFormAuth($event: any): void {
    this.formLoginOrCreateUser = $event;
    console.log($event);
  }

  refresh(): void {
    window.location.reload();
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
