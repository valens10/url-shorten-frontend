import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']  // Fixed 'styleUrls' issue
})
export class LayoutComponent implements OnInit {
  title: string = "Url Shorten";
  isSidebarOpen: boolean = true;

  user: any = '';

  constructor(
    private router: Router
  ) {
    this.user = JSON.parse(
      window.sessionStorage.getItem('user') as string);
  }

  ngOnInit(): void {
    if (!this.user) {
      this.router.navigate(['auth/login']);  // Redirect to login page if user not logged in yet.
      return;
    }
  }

  onSidebarToggle() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
