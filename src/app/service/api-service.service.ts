import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
          Authorization: `Token ${this.user.token}`,
        }),
      };

      this.fHeaders = {
        headers: new HttpHeaders({
          Authorization: `Token ${this.user.token}`,
        }),
      };

    }
  }

  // Create permission
  user_register(data: any): Observable<any> {
    const endpoint = '/auth/register';
    return this.http.post(this.BASE_URL + endpoint, data, this.headers)
  }

  user_login(data: any): Observable<any> {
    const endpoint = '/auth/login';
    return this.http.post(this.BASE_URL + endpoint, data, this.headers)
  }

  create_client_access_permissions(data: any): Observable<any> {
    const endpoint = '/create_client_access_permissions';
    return this.http.post(this.BASE_URL + endpoint, data, this.headers)
  }

}
