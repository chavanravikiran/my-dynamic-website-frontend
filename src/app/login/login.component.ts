import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
declare var particlesJS: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log("----------->",this.loginForm);
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('role', response.roles[0]);
          localStorage.setItem('websiteType', response.websiteType);
          localStorage.setItem('userName', response.userName);
          localStorage.setItem('userId', response.userId);
          
          this.router.navigate(['/landing']);
          this.showMessage(response.successMsg,'success');
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMessage = 'Invalid username or password';
          this.showMessage(this.errorMessage, 'error');
        }
      });
    } else {
      this.errorMessage = 'Invalid username or password';
      this.showMessage(this.errorMessage, 'error');
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
