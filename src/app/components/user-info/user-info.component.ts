import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserMeService } from '../../services/user/user-me.service';
import { Subject, takeUntil } from 'rxjs';
import { UserMeResponse } from '../../model/user/UserMeResponse';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit, OnDestroy {

  private $destroy: Subject<void> = new Subject<void>();
  private userMeService = inject(UserMeService);
  private router = inject(Router);
  public userMe: UserMeResponse = {} as UserMeResponse;

  getUserMe() {
    this.userMeService.getUserMe(this.userMe)
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: (response) => {
          this.userMe.id = response.id;
          this.userMe.username = response.username;
          this.userMe.email = response.email;
        },
        error: (error) => {
          alert('Error: ' + error.error.message);
          this.router.navigate(['/']);
        }
      });
  };

  ngOnInit(): void {
    this.getUserMe();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
