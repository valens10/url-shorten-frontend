import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'url_shorten-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  user: any = '';

  constructor(
  ) {
    this.user = JSON.parse(
      window.sessionStorage.getItem('user') as string);
  }
}
