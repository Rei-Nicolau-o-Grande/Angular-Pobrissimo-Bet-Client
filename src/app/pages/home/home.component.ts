import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent, SidenavComponent, BannerComponent, MatSidenavModule, MatListModule, MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }

}
