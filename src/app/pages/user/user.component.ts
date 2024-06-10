import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from '../../components/user-info/user-info.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule, HeaderComponent, UserInfoComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

}
