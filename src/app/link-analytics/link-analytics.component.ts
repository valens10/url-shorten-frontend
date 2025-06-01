import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../service/api-service.service';

@Component({
  selector: 'app-link-analytics',
  imports: [ReactiveFormsModule, RouterLink, FormsModule, CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './link-analytics.component.html',
  styleUrl: './link-analytics.component.scss'
})
export class LinkAnalyticsComponent implements OnInit {
  searchTerm: string = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['q'] || '';
    });

    this.get_user_url();
  }

  user_urls: any = []
  filterResults: any = []
  get_user_url() {
    this.apiService.get_user_url().subscribe((res) => {
      this.user_urls = res?.data;
      this.filterResults = res?.data;
    }, err => {
      console.log(err?.message)
    })
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterResults = this.user_urls.filter((element: any) => {
      return (
        element.name
          ?.trim()
          .toLowerCase()
          .includes(filterValue.trim().toLowerCase()) ||
        element.short_code
          ?.trim()
          .toLowerCase()
          .includes(filterValue.trim().toLowerCase()) ||
        element.clicks
          ?.toString()
          ?.trim()
          .includes(filterValue.trim().toLowerCase()) ||
        element.id
          ?.toString()
          .trim()
          .includes(filterValue.trim().toLowerCase())
      );
    });
  }


}
