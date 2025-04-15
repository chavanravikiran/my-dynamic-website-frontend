import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`,credentials)
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
