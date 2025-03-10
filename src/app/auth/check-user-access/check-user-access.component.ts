import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-access',
  imports: [HttpClientModule],
  providers: [ApiService],
  templateUrl: './check-user-access.component.html',
  styleUrls: ['./check-user-access.component.scss']
})
export class CheckUserAccessComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Subscribe to query params to extract 'code' param
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        // Exchange the code for the token
        this.authService.get_user_data(token).subscribe((response: any) => {
          // Store the token
          let data = response.data
          data['token_expiry'] = new Date().getTime() + 15 * 60 * 1000 // Adding 15 minutes expiration time
          data['token'] = token

          window.sessionStorage.setItem('user', JSON.stringify(data))
          window.location.href = '/home/dashboard'
        }, (error) => {
          this.router.navigate(['/auth/login']);
        });
      } else {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
