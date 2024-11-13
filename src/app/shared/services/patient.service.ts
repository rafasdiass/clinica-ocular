import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient} from '../models/patient.model';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseUrl = 'https://api.clinica.com'; // Substitua pela URL real

  constructor(private http: HttpClient) {}

  getPatientData(): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/patient/profile`);
  }

  getAppointmentHistory(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/patient/appointments`);
  }

  updatePatientData(data: Partial<Patient>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/patient/profile`, data);
  }
}
