import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../service/api-service.service';
import { environment } from '../../environments/environment';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-analytics-view',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule, HighchartsChartModule],
  providers: [ApiService],
  templateUrl: './analytics-view.component.html',
  styleUrl: './analytics-view.component.scss',
  standalone: true
})
export class AnalyticsViewComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  clickDistributionChartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
      style: {
        fontFamily: 'Arial, sans-serif'
      },
      backgroundColor: '#ffffff',
      borderRadius: 8
    },
    title: {
      text: 'Click Distribution Over Time',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333333'
      }
    },
    xAxis: {
      categories: [],
      labels: {
        style: {
          fontSize: '12px',
          color: '#666666'
        }
      },
      title: {
        text: 'Date',
        style: {
          fontSize: '14px',
          color: '#666666'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Number of Clicks',
        style: {
          fontSize: '14px',
          color: '#666666'
        }
      },
      labels: {
        style: {
          fontSize: '12px',
          color: '#666666'
        }
      },
      gridLineColor: '#f0f0f0'
    },
    series: [{
      name: 'Daily Clicks',
      type: 'line',
      data: [],
      color: '#4CAF50',
      lineWidth: 3,
      marker: {
        enabled: true,
        radius: 4,
        symbol: 'circle'
      }
    }],
    credits: {
      enabled: false
    },
    tooltip: {
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 4,
      style: {
        fontSize: '12px'
      }
    },
    plotOptions: {
      line: {
        animation: {
          duration: 1000
        }
      }
    }
  };

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

  urlData: any = {}
  get_link_analytics() {
    this.apiService.link_analytics(this.short_code).subscribe((res) => {
      this.urlData = res?.data;
      this.updateChartData();
    }, err => {
      console.log(err?.message)
    })
  }

  updateChartData() {
    console.log('urlData', this.urlData)
    if (this.urlData.click_distribution?.daily) {
      const dailyData = Object.entries(this.urlData.click_distribution.daily);
      const categories = dailyData.map(([date]) => date);
      const data = dailyData.map(([, count]) => Number(count));

      console.log('data', data)
      console.log('categories', categories)

      this.clickDistributionChartOptions = {
        ...this.clickDistributionChartOptions,
        xAxis: {
          categories: categories
        },
        series: [{
          name: 'Daily Clicks',
          type: 'line',
          data: data
        }]
      };
    }
  }

  // Helper method to extract distribution data for the respective intervals // Helper method to return key-value pairs for the distribution
  getClickDistribution(distribution: any): any[] {
    return Object.entries(distribution).map(([key, value]) => ({ key, value }));
  }
}