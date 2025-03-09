import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../service/api-service.service';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder,
    private apiSerice: ApiService,
    private _location: Location

  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      gender: ['', Validators.required],
      address: [''],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/
      )]],
    });
  }

  get f() {
    return this.registerForm['controls'];
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return this.errAlert('Please fill out all required fields and ensure your password meets the requirements.')
    }

    const param = this.registerForm.value

    this.isSubmitting = true;
    this.apiSerice.user_register(param).subscribe((res) => {
      this.isSubmitting = false;
      Swal.fire({
        title: 'Success',
        text: res?.message,
        icon: 'success',
        confirmButtonColor: 'green',
        allowOutsideClick: false,
        confirmButtonText: 'Okay'
      }).then((result) => {
        this._location.back();
      })
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

