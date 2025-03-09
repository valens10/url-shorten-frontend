import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']  // Fixed 'styleUrls' issue
})
export class LayoutComponent {
  title: string = "Url Shorten";
  isSidebarOpen: boolean = true;

  onSidebarToggle() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
