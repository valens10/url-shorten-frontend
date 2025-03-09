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

  constructor(
    private apiSerice: ApiService,
    private router: Router
  ) {

  }

  onButtonClick() {
    this.toggleSidebar = !this.toggleSidebar;
    this.sidebarToggle.emit(this.toggleSidebar);
  }


  logout() {
    this.apiSerice.logout().subscribe(() => {
      localStorage.clear();
      window.location.href = '/auth/login'
    });
  }
}
