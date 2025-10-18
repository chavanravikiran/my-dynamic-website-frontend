import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageResponse } from './appointment/models/message-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/users';  // Example: http://localhost:8080/auth/login
  private websiteType = environment.websiteType;
  private currentUser: any = null;

  constructor(private http: HttpClient,private snackBar: MatSnackBar) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }
  
  get currentUserValue() {
    return this.currentUser;
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

  registration(registration: {name: string, username:string, email:string, phoneNumber: string, 
        address: string, password: string,websiteType?: string}): Observable<any> {
          registration.websiteType = this.websiteType;
    return this.http.post<any>(`${this.apiUrl}/register`, registration);
  }
  

  login(credentials: { username: string; password: string ,websiteType?: string}): Observable<any> {
    credentials.websiteType = this.websiteType
    return this.http.post<any>(`${this.apiUrl}/login`,credentials)
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token && token !== 'null' && token !== 'undefined' ? token : null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
  
  forgotPassword(email: string) {
    return this.http.post<MessageResponse>(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
  }

  submitInquiry(data: any): Observable<any> {
    data.websiteType = this.websiteType
    return this.http.post<any>(`${this.apiUrl}/submitinquiry`,data)
  }
}
