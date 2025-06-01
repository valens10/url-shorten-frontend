import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../service/api-service.service';

@Component({
  selector: 'url_shorten-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() sidebarToggle = new EventEmitter<boolean>();

  toggleSidebar: boolean = false;
  searchTerm = '';
  showDropdown = false;
  user: any = JSON.parse(sessionStorage.getItem('user') || '{}');
  constructor(
    private apiSerice: ApiService,
    private router: Router
  ) {

  }

  onButtonClick() {
    this.toggleSidebar = !this.toggleSidebar;
    this.sidebarToggle.emit(this.toggleSidebar);
  }

  onInput() {
    this.showDropdown = !!this.searchTerm;
  }

  onSearch() {
    this.showDropdown = false;
    if (this.searchTerm) {
      this.navigateTo('links');
    }
  }

  navigateTo(category: string) {
    this.showDropdown = false;
    if (category == 'links') {
      this.router.navigate(['/home/links'], { queryParams: { q: this.searchTerm } });
    } else if (category == 'analytics') {
      this.router.navigate(['/home/link-analytics'], { queryParams: { q: this.searchTerm } });
    }
  }

  logout() {
    this.apiSerice.logout().subscribe(() => {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/auth/login'
    });
  }
}
