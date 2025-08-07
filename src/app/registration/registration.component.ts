import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  errorMessage: string = '';
  passwordStrength: number = 0;

  constructor(private fb: FormBuilder,private http: HttpClient,private authService: AuthService,
      private router: Router
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, this.passwordValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValidLength = value.length >= 8;

    if (hasUpperCase && hasNumber && hasSpecialChar && isValidLength) {
      return null;
    }

    return { weakPassword: true };
  }

  checkPasswordStrength() {
    const password = this.registrationForm.get('password')?.value || '';
    let strength = 0;
  
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;
  
    this.passwordStrength = strength;
  }
  
  getPasswordStrengthClass(): string {
    if (this.passwordStrength < 25) {
      return 'weak';
    } else if (this.passwordStrength < 50) {
      return 'medium';
    } else {
      return 'strong';
    }
  }
 
  // registerUser(){
  //   if(this.registrationForm.valid){
  //       this.authService.registration(this.registrationForm.value).subscribe({
  //         next: (response) => {
  //           console.log('Login successful:', response);
  //           localStorage.setItem('token', response.token);
  //           this.router.navigate(['/dashboard']);
  //         },
  //         error: (err) => {
  //           console.error('Login error:', err);
  //           this.errorMessage = 'Invalid username or password';
  //         }
  //       });
  //   }else {
  //     this.errorMessage = 'Please fill in all fields correctly.';
  //   }
  // }
  registerUser() {
    if (this.registrationForm.valid) {
      this.authService.registration(this.registrationForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
  
          // Check if token is returned
          if (response.token && response.role) {
            localStorage.setItem('token', response.token); // Store token
            localStorage.setItem('role', response.role);   // Store role
  
            // Redirect based on role
            if (response.role === 'ADMIN' || response.role === 'ROLE_ADMIN') {
              this.router.navigate(['/admin-dashboard']);
            } else if (response.role === 'USER' || response.role === 'ROLE_USER') {
              this.router.navigate(['/home']);
            } else {
              this.router.navigate(['/registration']);
            }
          } else {
            this.errorMessage = 'Registration successful, but token/role is missing!';
          }
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.errorMessage = err.error.message || 'An error occurred during registration.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields correctly.';
    }
  }
  
}
