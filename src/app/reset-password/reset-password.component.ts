import { Component, OnInit } from '@angular/core';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.matchPassword });
  }

  matchPassword(group: FormGroup) {
    return group.get('password')!.value === group.get('confirmPassword')!.value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const password = this.resetPasswordForm.get('password')!.value;
      this.authService.resetPassword(this.token, password).subscribe({
        next: () => {
          console.log("Success ahe");
          this.showMessage('Password reset successfully!', 'success');
          this.router.navigate(['/login']);
        },
        error: () => this.showMessage('Failed to reset password.', 'error')
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
