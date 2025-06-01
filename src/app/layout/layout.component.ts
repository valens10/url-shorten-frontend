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
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  title: string = "Url Shorten";
  isSidebarOpen: boolean = true;
  user: any = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) {
    this.user = JSON.parse(
      window.sessionStorage.getItem('user') as string);
  }

  ngOnInit(): void {
    if (!this.user) {
      this.router.navigate(['auth/login']);
      return;
    }

    // Check token expiry every 5 minutes
    setInterval(() => { this.checkTokenExpiry(); }, 5 * 60 * 1000);

    // Initial check
    this.checkTokenExpiry();
  }

  private checkTokenExpiry() {
    if (this.user?.token) {
      try {
        // Decode the JWT token to get expiry
        const tokenParts = this.user.token.split('.');
        if (tokenParts.length == 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          const expiryTime = payload.exp * 1000; // Convert to milliseconds
          const currentTime = new Date().getTime();

          // If token expires in less than 5 minutes, refresh it
          if (expiryTime - currentTime < 5 * 60 * 1000) {
            this.refresh_token();
          }
        }
      } catch (error) {
        console.error('Error checking token expiry:', error);
      }
    }
  }

  onSidebarToggle() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  refresh_token() {
    const param = {
      refresh: this.user.token_refresh
    }
    this.apiService.refresh_token(param).subscribe({
      next: (res) => {
        // already set new values in the service
      },
      error: (error) => {
        console.error('Token refresh failed:', error);
        // If refresh fails, redirect to login
        window.sessionStorage.removeItem('user');
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
