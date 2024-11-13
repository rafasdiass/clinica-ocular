import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'https://api.clinica.com/admin';

  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stats`);
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/doctors`);
  }

  getAppointmentsByDoctor(doctorId: string | null): Observable<any> {
    return this.http.get(`${this.baseUrl}/appointments?doctorId=${doctorId}`);
  }
}
