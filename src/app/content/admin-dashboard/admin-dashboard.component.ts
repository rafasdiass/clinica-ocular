import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faUsers,
  faChartLine,
  faClipboard,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { AdminService } from '../../shared/services/admin.service';
import { Appointment } from '../../shared/models/appointment.model';
import { Doctor } from '../../shared/models/doctor.model';
import { Stats } from '../../shared/models/stats.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    FontAwesomeModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  stats: Stats = {
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    completedAppointments: 0,
    canceledAppointments: 0,
  };
  doctors: Doctor[] = [];
  filteredAppointments: Appointment[] = [];
  displayedColumns: string[] = ['date', 'patient', 'status'];
  selectedDoctor: string | null = null;

  constructor(
    private adminService: AdminService,
    private library: FaIconLibrary
  ) {
    // Registrar ícones FontAwesome
    this.library.addIcons(faUsers, faChartLine, faClipboard, faDollarSign);
  }

  ngOnInit(): void {
    this.loadStats();
    this.loadDoctors();
  }

  /**
   * Carrega estatísticas administrativas.
   */
  private loadStats(): void {
    this.adminService.getStats().subscribe({
      next: (data: Stats) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('Erro ao carregar estatísticas:', err);
      },
    });
  }

  /**
   * Carrega a lista de médicos.
   */
  private loadDoctors(): void {
    this.adminService.getDoctors().subscribe({
      next: (data: Doctor[]) => {
        this.doctors = data;
      },
      error: (err) => {
        console.error('Erro ao carregar médicos:', err);
      },
    });
  }

  /**
   * Filtra as consultas por médico selecionado.
   */
  onFilterChange(): void {
    if (!this.selectedDoctor) {
      this.filteredAppointments = [];
      return;
    }

    this.adminService.getAppointmentsByDoctor(this.selectedDoctor).subscribe({
      next: (data: Appointment[]) => {
        this.filteredAppointments = data;
      },
      error: (err) => {
        console.error('Erro ao filtrar consultas:', err);
      },
    });
  }
}
