import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { ApiService } from '../service/api-service.service';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-links',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule, CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss'
})
export class LinksComponent implements OnInit {
  host_name: any = environment.HOST_NAME + '/api/redirect_url/'

  constructor(private fb: FormBuilder,
    private apiSerice: ApiService,
    private _location: Location

  ) {
  }

  ngOnInit(): void {

    this.get_user_url();
  }

  user_urls: any = []
  filterResults: any = []
  get_user_url() {
    this.apiSerice.get_user_url().subscribe((res) => {
      this.user_urls = res?.data;
      this.filterResults = this.user_urls;
    }, err => {
      this.errAlert(err.error.message)
    })
  }

  deleleUrlModal(usr_id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete_url(usr_id);
      }
    })
  }

  isSubmitting = false
  delete_url(url_id: any): void {

    this.isSubmitting = true;
    this.apiSerice.delete_url(url_id).subscribe((res) => {
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

  gotoUrl(url_id: any) {

  }

  copyToClipboard(text: string) {
    // Use the Clipboard API to copy the text to the clipboard
    navigator.clipboard.writeText(text).then(
      () => {
        Swal.fire('Success', 'Copied to clipboard', 'success')
      },
      (err) => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy URL.');
      }
    );
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterResults = this.user_urls.filter((element: any) => {
      return (
        element.short_code
          ?.trim()
          .toLowerCase()
          .includes(filterValue.trim().toLowerCase()) ||
        element.clicks
          ?.toString()
          ?.trim()
          .includes(filterValue.trim().toLowerCase()) ||
        element.id
          ?.toString()
          .trim()
          .includes(filterValue.trim().toLowerCase())
      );
    });
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
