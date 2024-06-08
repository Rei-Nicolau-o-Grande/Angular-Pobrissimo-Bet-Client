import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule, MatIconModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  nameGames: Array<string> = ['Roleta da Picanha 🥩', 'Game 2', 'Game 3', 'Game 4', 'Game 5'];

  @Input() isOpen: boolean = false;
  @Output() closeSidenav = new EventEmitter<void>();

  toggleSidenav() {
    this.isOpen = !this.isOpen;
  }

  close() {
    this.closeSidenav.emit();
  }
}
