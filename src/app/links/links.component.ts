import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { ApiService } from '../service/api-service.service';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  isLoading: boolean = false;
  searchTerm: string = '';

  constructor(private fb: FormBuilder,
    private apiSerice: ApiService,
    private _location: Location,
    private route: ActivatedRoute

  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['q'] || '';
    });
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
        window.location.reload();
      })
    }, err => {
      this.isSubmitting = false;
      this.errAlert(err.error.message)
    })
  }

  gotoUrl(url_id: any) {

  }

  copyToClipboard(text: string) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => {
          // Show success message after 2 seconds dismiss automatically and loader
          Swal.fire({
            title: 'Success',
            text: 'Copied to clipboard',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        },
        (err) => {
          console.error('Failed to copy: ', err);
        }
      );
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        Swal.fire('Success', 'Copied to clipboard', 'success');
      } catch (err) {
        console.error('Fallback: Failed to copy', err);
      }
      document.body.removeChild(textArea);
    }
  }



  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterResults = this.user_urls.filter((element: any) => {
      return (
        element.name
          ?.trim()
          .toLowerCase()
          .includes(filterValue.trim().toLowerCase()) ||
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
  quickDateFilter(data: Event) {
    this.isLoading = true;
    const option = (data.target as HTMLSelectElement).value;

    const now = new Date();
    let start: Date | null = null;
    let end: Date | null = null;

    if (option === 'today') {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    } else if (option === '7days') {
      start = new Date(now);
      start.setDate(now.getDate() - 7);
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    } else if (option === 'month') {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    } else if (option === 'last_month') {
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    }

    if (start && end) {
      this.filterResults = this.user_urls.filter((item: any) => {
        const created = new Date(item.created_at);
        return created >= start && created <= end;
      });
    } else {
      this.filterResults = [...this.user_urls];
    }

    // Simulate a small delay to show loading state
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
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

  // view plans coming soon
  viewPlans() {
    Swal.fire({
      title: 'Coming soon',
      text: 'This feature is coming soon',
      confirmButtonColor: 'green',
      confirmButtonText: 'Okay'
    })
  }
}
