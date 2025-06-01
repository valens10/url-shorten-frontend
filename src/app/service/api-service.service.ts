import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_URL = environment.BASE_URL;
  host_name = environment.HOST_NAME;

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  fHeaders = {
    headers: new HttpHeaders({}),
  };

  user: any = {}

  constructor(private http: HttpClient) {
    this.user = JSON.parse(
      window.sessionStorage.getItem('user') as string
    );

    if (this.user) {
      this.headers = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        }),
      };

      this.fHeaders = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.user.token}`,
        }),
      };

    }
  }

  // Create permission
  user_register(data: any): Observable<any> {
    const endpoint = '/auth/register';
    return this.http.post(this.BASE_URL + endpoint, data, this.headers)
  }

  shorten_url(data: any): Observable<any> {
    const endpoint = '/api/shorten';
    return this.http.post(this.BASE_URL + endpoint, data, this.headers)
  }

  delete_url(url_id: any): Observable<any> {
    const endpoint = '/api/delete_url/' + url_id;
    return this.http.delete(this.BASE_URL + endpoint, this.headers)
  }

  logout(): Observable<any> {
    const endpoint = '/auth/logout';
    const data = {
      refresh_token: this.user.token_refresh
    }
    return this.http.post(this.BASE_URL + endpoint, data, this.headers)
  }

  refresh_token(data: any): Observable<any> {
    const endpoint = '/auth/token_refresh';
    return this.http.post(this.BASE_URL + endpoint, data, this.headers).pipe(
      tap((response: any) => {
        if (response) {
          // Update the user data with new tokens
          this.user['token'] = response.access;
          this.user['token_refresh'] = response.refresh;

          window.sessionStorage.setItem('user', JSON.stringify(this.user));

          // Update headers with new token
          this.headers = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${this.user.token}`,
            }),
          };

          this.fHeaders = {
            headers: new HttpHeaders({
              Authorization: `Bearer ${this.user.token}`,
            }),
          };
        }
      })
    );
  }


  get_user_url(): Observable<any> {
    const endpoint = '/api/urls';
    return this.http.get(this.BASE_URL + endpoint, this.headers)
  }

  link_analytics(short_url: any): Observable<any> {
    const endpoint = '/api/analytics/' + short_url;
    return this.http.get(this.BASE_URL + endpoint, this.headers)
  }

  user_login(data: any): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    };
    const endpoint = '/auth/login';
    return this.http.post(this.BASE_URL + endpoint, data, headers)
  }

  create_client_access_permissions(data: any): Observable<any> {
    const endpoint = '/create_client_access_permissions';
    return this.http.post(this.BASE_URL + endpoint, data, this.headers)
  }

  // Function to exchange the code and get the token
  get_user_data(token: string) {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get(`${this.BASE_URL}/auth/get_user_data`, headers);
  }

}
