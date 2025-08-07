import { Component, OnInit } from '@angular/core';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // onSubmit() {
  //   if (this.forgotPasswordForm.valid) {
  //     this.loading = true; // Start loader
  //     this.authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe({
  //       next: (response) => {
  //         this.loading = false; // Stop loader
  //         this.showMessage('Reset link sent to your email', 'success');
  //       },
  //       error: (response) => {
  //         this.loading = false; // Stop loader
  //         this.showMessage(response.errorMessage, response.status);
  //       }
  //     });
  //   }
  // }
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.loading = true;
  
      this.authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe({
        next: (response) => {
          this.loading = false;
  
          if (response.status === 'SUCCESS' && response.success) {
            this.showMessage(response.successMsg || 'Reset link sent to your email', 'success');
          } else {
            this.showMessage(response.errorMessage || 'Something went wrong', 'error');
          }
        },
        error: (error) => {
          this.loading = false;
          const message = error?.error?.errorMessage || 'Server error. Please try again.';
          this.showMessage(message, 'error');
        }
      });
    }
  }
  
  showMessage(message: string, type: 'success' | 'error') {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-snackbar-container']
    });
  }
}