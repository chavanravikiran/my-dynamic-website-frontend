import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageResponse } from './appointment/models/message-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/users';  // Example: http://localhost:8080/auth/login
  private websiteType = environment.websiteType;
  
  constructor(private http: HttpClient) {}
  
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
}
