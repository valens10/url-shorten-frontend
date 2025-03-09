import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../service/api-service.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;

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

      window.sessionStorage.setItem('user', JSON.stringify(res?.data))
      window.location.href = '/home/dashboard'

    }, err => {
      this.isSubmitting = false;
      this.errAlert(err.error.message)
    })
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

