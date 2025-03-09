import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'url_shorten-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Output() sidebarToggle = new EventEmitter<boolean>();

  toggleSidebar: boolean = false;

  onButtonClick() {
    this.toggleSidebar = !this.toggleSidebar;
    this.sidebarToggle.emit(this.toggleSidebar);
  }
}
