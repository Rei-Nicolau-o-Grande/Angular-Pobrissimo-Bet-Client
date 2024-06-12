import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Subject, takeUntil } from 'rxjs';
import { UserMeResponse } from '../../model/user/UserMeResponse';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserRequest } from '../../model/user/UserRequest';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit, OnDestroy {

  private $destroy: Subject<void> = new Subject<void>();
  private userService = inject(UserService);
  private router = inject(Router);
  public userMe: UserMeResponse = {} as UserMeResponse;

  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  public formUpdateUser = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [])
  });

  getUserMe() {
    this.userService.getUserMe(this.userMe)
      .subscribe({
        next: (response) => {
          this.userMe.id = response.id;
          this.userMe.username = response.username;
          this.userMe.email = response.email;

          this.formUpdateUser.setValue({
            username: this.userMe.username,
            email: this.userMe.email,
            password: ''
          });
        },
        error: (error) => {
          alert('Error: ' + error.error.message);
          this.router.navigate(['/']);
        }
      });
  };

  updateUser() {
    if (this.formUpdateUser.valid) {
      this.userService.updateUser(this.formUpdateUser.value as UserRequest, this.userMe.id)
      .subscribe({
        next: (response) => {
          this.getUserMe();
          alert('Atualizado com sucesso!')
        },
        error: (error) => {
          alert('Error: ' + error.error.errorFields.email);
        }
      })
    }
  }

  ngOnInit(): void {
    this.getUserMe();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
