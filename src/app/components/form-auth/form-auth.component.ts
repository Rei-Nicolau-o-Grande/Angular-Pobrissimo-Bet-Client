import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

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
    MatInputModule
  ],
  templateUrl: './form-auth.component.html',
  styleUrl: './form-auth.component.scss'
})
export class FormAuthComponent implements OnInit {

  private dialogRef = inject(MatDialogRef<HeaderComponent>);
  private matDialogData = inject(MAT_DIALOG_DATA);
  public formLoginOrCreateUser: boolean = true;

  public formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  public formCreateUser = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.formLoginOrCreateUser = this.matDialogData;
  }

  public onSubmitLoginForm(): void {
    console.log('Login');
    this.handleCloseModal();
  }

  public onSubmitCreateUserForm(): void {
    console.log('CreateUser');
    this.handleCloseModal();
  }

  public changeFormLoginOrCreateUser(): void {
    this.formLoginOrCreateUser = !this.formLoginOrCreateUser;
  }

  public handleCloseModal(): void {
    this.dialogRef.close();
  }

  public receiveEventFormAuth($event: any): void {
    this.formLoginOrCreateUser = $event;
    console.log($event);
  }
}
