import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../service/api-service.service';
import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-link-creation',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './link-creation.component.html',
  styleUrl: './link-creation.component.scss'
})
export class LinkCreationComponent {
  urlForm!: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder,
    private apiSerice: ApiService,
    private _location: Location

  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.urlForm = this.fb.group({
      name: ['', [Validators.required]],
      long_url: ['', [Validators.required]],
    });
  }

  get longUrl() {
    return this.urlForm.get('long_url');
  }

  get f() {
    return this.urlForm['controls'];
  }

  onSubmit(): void {
    if (this.urlForm.invalid) {
      return this.errAlert('Loang URL is required.')
    }

    if (!this.isValidUrl(this.urlForm.value.long_url)) {
      return this.errAlert('Invalid URL! Please enter a valid web address.')
    }

    const param = this.urlForm.value

    this.isSubmitting = true;
    this.apiSerice.shorten_url(param).subscribe((res) => {
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

  isValidUrl(url: string): boolean {
    try {
      // Attempt to create a new URL object (built-in validation)
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
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

  cancel() {
    this._location.back();
  }
}