import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Stats } from '../models/stats.model';
import { Doctor } from '../models/doctor.model';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminEndpoint = '/admin';

  constructor(private api: ApiService) {}

  /**
   * Obtém estatísticas administrativas.
   */
  getStats(): Observable<Stats> {
    return this.api.get<Stats>(`${this.adminEndpoint}/stats`);
  }

  /**
   * Obtém a lista de médicos.
   */
  getDoctors(): Observable<Doctor[]> {
    return this.api.get<Doctor[]>(`${this.adminEndpoint}/doctors`);
  }

  /**
   * Obtém as consultas de um médico específico.
   */
  getAppointmentsByDoctor(doctorId: string | null): Observable<Appointment[]> {
    const params = doctorId ? { doctorId } : undefined;
    return this.api.get<Appointment[]>(
      `${this.adminEndpoint}/appointments`,
      params
    );
  }

  /**
   * Filtra consultas com base no status e período.
   */
  filterAppointmentsByStatusAndDate(
    status: string,
    startDate: string,
    endDate: string
  ): Observable<Appointment[]> {
    const params = { status, startDate, endDate };
    return this.api.get<Appointment[]>(
      `${this.adminEndpoint}/appointments/filter`,
      params
    );
  }

  /**
   * Obtém as consultas canceladas.
   */
  getCanceledAppointments(): Observable<Appointment[]> {
    return this.api.get<Appointment[]>(
      `${this.adminEndpoint}/appointments/canceled`
    );
  }

  /**
   * Obtém as consultas concluídas.
   */
  getCompletedAppointments(): Observable<Appointment[]> {
    return this.api.get<Appointment[]>(
      `${this.adminEndpoint}/appointments/completed`
    );
  }
}
