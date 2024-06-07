import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  nameGames: Array<string> = ['Roleta da Picanha 🥩', 'Game 2', 'Game 3', 'Game 4', 'Game 5'];
}
