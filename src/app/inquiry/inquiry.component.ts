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
    errorMessage: string = '';

    ngOnInit(): void {

    }
    inquiryForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [ Validators.pattern('^[0-9]{10}$')]],
      title:['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });

  submitInquiry(): void {
    console.log("this.inquiryForm",this.inquiryForm.value);
    if (this.inquiryForm.valid) {
      this.authService.submitInquiry(this.inquiryForm.value).subscribe({
        next: (response) => {
          this.inquiryForm.reset();
          this.authService.showMessage(response.successMsg,'success');
        },
        error: (response) => {
          this.authService.showMessage(this.errorMessage, 'error');
        }
      });
    }else{
      this.inquiryForm.markAllAsTouched();
    }

  }
}
