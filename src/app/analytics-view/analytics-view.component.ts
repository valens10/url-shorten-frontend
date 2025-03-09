import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../service/api-service.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-analytics-view',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './analytics-view.component.html',
  styleUrl: './analytics-view.component.scss'
})
export class AnalyticsViewComponent implements OnInit {
  short_code: any = ''
  host_name: any = environment.HOST_NAME + '/api/redirect_url/'
  constructor(private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.short_code = params['link_id'];
    });
  }

  ngOnInit(): void {

    this.get_link_analytics();
  }

  urlData: any = []
  get_link_analytics() {
    this.apiService.link_analytics(this.short_code).subscribe((res) => {
      this.urlData = res?.data;
    }, err => {
      console.log(err?.message)
    })
  }

  // Helper method to extract distribution data for the respective intervals // Helper method to return key-value pairs for the distribution
  getClickDistribution(distribution: any): any[] {
    return Object.entries(distribution).map(([key, value]) => ({ key, value }));
  }



}