import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { authGuard } from './guard/canActivate/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [authGuard]
  }
];
