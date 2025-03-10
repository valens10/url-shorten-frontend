import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../service/api-service.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterLink, HttpClientModule],
  providers: [ApiService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;
  host_name = environment.HOST_NAME

  constructor(private fb: FormBuilder,
    private apiSerice: ApiService,
    private _location: Location,
    private router: Router

  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm['controls'];
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return this.errAlert('Please fill out all required fields and ensure your password meets the requirements.')
    }

    const param = this.loginForm.value

    this.isSubmitting = true;
    this.apiSerice.user_login(param).subscribe((res) => {
      this.isSubmitting = false;

      let data = res.data
      data['token_expiry'] = new Date().getTime() + 15 * 60 * 1000 // Adding 15 minutes expiration time

      window.sessionStorage.setItem('user', JSON.stringify(data))
      window.location.href = '/home/dashboard'

    }, err => {
      this.isSubmitting = false;
      this.errAlert(err.error.message)
    })
  }

  loginWithGoogle() {
    window.location.href = `${this.host_name}/social/login/google-oauth2/`;
  }

  loginWithGitHub() {
    window.location.href = `${this.host_name}/social/login/github/`;
  }


  errAlert(msg: any) {
    Swal.fire({
      title: 'Error',
      text: msg,
      icon: 'error',
      confirmButtonColor: 'green',
      confirmButtonText: 'Okay'
    })
  }

}

