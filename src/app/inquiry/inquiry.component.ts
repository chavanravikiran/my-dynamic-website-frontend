// import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApplicationService } from '../appointment/services/application.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss'],
})
export class InquiryComponent implements  OnInit{

  constructor(private fb: FormBuilder, private http: HttpClient,
    private authService : AuthService) {}

  ngOnInit(): void {

  }
  inquiryForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    email: ['', [Validators.required, Validators.email]],
    // phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    title:['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  // submitInquiry() {
  //   if (this.inquiryForm.valid) {
  //     this.http.post('/api/inquiry', this.inquiryForm.value).subscribe({
  //       next: res => alert('Inquiry submitted!'),
  //       error: err => alert('Error occurred while submitting inquiry.'),
  //     });
  //   } else {
  //     alert('Please fix validation errors.');
  //   }
  // }

  submitInquiry(): void {
    console.log("this.inquiryForm",this.inquiryForm.value);
    if (this.inquiryForm.valid) {
      this.authService.submitInquiry(this.inquiryForm.value).subscribe({
        next: () => {
          this.inquiryForm.reset();
        },
        error: (err) => {
          console.error('Something went wrong', err);
        }
      });
    }else{
      this.inquiryForm.markAllAsTouched();
    }

  }
}
