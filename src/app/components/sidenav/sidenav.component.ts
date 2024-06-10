import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule
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
