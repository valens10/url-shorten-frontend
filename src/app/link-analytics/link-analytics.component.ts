import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api-service.service';

@Component({
  selector: 'app-link-analytics',
  imports: [ReactiveFormsModule, RouterLink, FormsModule, CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './link-analytics.component.html',
  styleUrl: './link-analytics.component.scss'
})
export class LinkAnalyticsComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.get_user_url();
  }

  user_urls: any = []
  get_user_url() {
    this.apiService.get_user_url().subscribe((res) => {
      this.user_urls = res?.data;
    }, err => {
      console.log(err?.message)
    })
  }


}
