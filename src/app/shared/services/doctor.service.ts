import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor, Schedule } from '../models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private baseUrl = 'https://api.clinica.com/doctors'; // Substitua pela URL do backend

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}`);
  }

  addDoctor(doctor: Partial<Doctor>): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.baseUrl}`, doctor);
  }

  updateDoctor(doctorId: string, doctor: Partial<Doctor>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${doctorId}`, doctor);
  }

  deleteDoctor(doctorId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${doctorId}`);
  }

  addSchedule(doctorId: string, schedule: Schedule): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/${doctorId}/schedule`,
      schedule
    );
  }

  removeSchedule(doctorId: string, schedule: Schedule): Observable<void> {
    return this.http.request<void>(
      'delete',
      `${this.baseUrl}/${doctorId}/schedule`,
      {
        body: schedule,
      }
    );
  }

  blockSchedule(doctorId: string, schedule: Schedule): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/${doctorId}/block-schedule`,
      schedule
    );
  }

  generateTimeSlots(
    startTime: string,
    endTime: string,
    consultationDuration: number,
    breakDuration: number
  ): string[] {
    const slots: string[] = [];
    let current = this.parseTime(startTime);
    const end = this.parseTime(endTime);

    while (current < end) {
      const nextSlot = new Date(
        current.getTime() + consultationDuration * 60000
      );
      slots.push(this.formatTime(current));
      current = new Date(nextSlot.getTime() + breakDuration * 60000);
    }

    return slots;
  }

  private parseTime(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  private formatTime(date: Date): string {
    return date.toTimeString().slice(0, 5);
  }
}
