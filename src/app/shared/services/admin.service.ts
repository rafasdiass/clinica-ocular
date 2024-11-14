import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { Appointment } from '../models/appointment.model';
import { Stats } from '../models/stats.model';

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
  getAppointmentsByDoctor(doctorId: string): Observable<Appointment[]> {
    return this.api.get<Appointment[]>(
      `${this.adminEndpoint}/appointments?doctorId=${doctorId}`
    );
  }
}
