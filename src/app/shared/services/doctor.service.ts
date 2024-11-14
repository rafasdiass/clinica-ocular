import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Doctor, Schedule } from '../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private doctorEndpoint = '/doctors';

  constructor(private api: ApiService) {}

  getDoctors(): Observable<Doctor[]> {
    return this.api.get<Doctor[]>(this.doctorEndpoint);
  }

  addDoctor(doctor: Partial<Doctor>): Observable<Doctor> {
    return this.api.post<Doctor>(this.doctorEndpoint, doctor);
  }

  updateDoctor(doctorId: string, doctor: Partial<Doctor>): Observable<void> {
    return this.api.put<void>(`${this.doctorEndpoint}/${doctorId}`, doctor);
  }

  deleteDoctor(doctorId: string): Observable<void> {
    return this.api.delete<void>(`${this.doctorEndpoint}/${doctorId}`);
  }

  addSchedule(doctorId: string, schedule: Schedule): Observable<void> {
    return this.api.post<void>(
      `${this.doctorEndpoint}/${doctorId}/schedule`,
      schedule
    );
  }
}
