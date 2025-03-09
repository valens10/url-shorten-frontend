import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../service/api-service.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterModule, CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']  // Fixed 'styleUrls' issue
})
export class LayoutComponent implements OnInit {
  title: string = "Url Shorten";
  isSidebarOpen: boolean = true;

  user: any = '';

  constructor(
    private router: Router,
    private apiSerice: ApiService,
  ) {
    this.user = JSON.parse(
      window.sessionStorage.getItem('user') as string);
  }

  ngOnInit(): void {
    if (!this.user) {
      this.router.navigate(['auth/login']);  // Redirect to login page if user not logged in yet.
      return;
    }

    const token_expiry = this.user?.token_expiry;
    // Check if the token is expired (15 minutes threshold)
    if (token_expiry) {
      const currentTime = new Date().getTime();
      const expirationTime = new Date(token_expiry).getTime();

      // If token expired or about to expire
      if ((currentTime - expirationTime) >= 15 * 60 * 1000) {
        this.refresh_token();
      }
    }
  }

  onSidebarToggle() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  refresh_token() {
    this.apiSerice.refresh_token().subscribe((res) => {
      window.sessionStorage.setItem('user', JSON.stringify(res?.data))
    });
  }
}
