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
  faCheckCircle,
  faTimesCircle,
  faUserMd,
  faClipboardList,
  faChartBar,
  faCalendarAlt,
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
  isLoadingStats = true;
  isLoadingDoctors = true;
  hasErrorStats = false;
  hasErrorDoctors = false;

  constructor(
    private adminService: AdminService,
    private library: FaIconLibrary
  ) {
    this.library.addIcons(
      faUsers,
      faChartLine,
      faClipboard,
      faDollarSign,
      faCheckCircle,
      faTimesCircle,
      faUserMd,
      faClipboardList,
      faChartBar,
      faCalendarAlt
    );
  }

  ngOnInit(): void {
    this.loadStats();
    this.loadDoctors();
  }

  /**
   * Carrega as estatísticas administrativas.
   */
  private loadStats(): void {
    this.isLoadingStats = true;
    this.hasErrorStats = false;

    this.adminService.getStats().subscribe({
      next: (data: Stats) => {
        this.stats = data;
        this.isLoadingStats = false;
      },
      error: (err) => {
        console.error('Erro ao carregar estatísticas:', err);
        this.hasErrorStats = true;
        this.isLoadingStats = false;
      },
    });
  }

  /**
   * Carrega a lista de médicos.
   */
  private loadDoctors(): void {
    this.isLoadingDoctors = true;
    this.hasErrorDoctors = false;

    this.adminService.getDoctors().subscribe({
      next: (data: Doctor[]) => {
        this.doctors = data;
        this.isLoadingDoctors = false;
      },
      error: (err) => {
        console.error('Erro ao carregar médicos:', err);
        this.hasErrorDoctors = true;
        this.isLoadingDoctors = false;
      },
    });
  }

  /**
   * Filtra as consultas com base no médico selecionado.
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
