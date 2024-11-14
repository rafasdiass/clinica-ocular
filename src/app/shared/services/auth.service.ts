import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authEndpoint = '/auth';

  constructor(private api: ApiService) {}

  login(email: string, password: string): Observable<any> {
    return this.api.post(`${this.authEndpoint}/login`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
