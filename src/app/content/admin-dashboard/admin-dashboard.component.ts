import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../shared/services/admin.service';

interface Stats {
  totalAppointments: number;
  completedAppointments: number;
  canceledAppointments: number;
}

interface Doctor {
  id: string;
  name: string;
}

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
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  stats: Stats = {
    totalAppointments: 0,
    completedAppointments: 0,
    canceledAppointments: 0,
  };
  doctors: Doctor[] = [];
  filteredAppointments: any[] = [];
  displayedColumns: string[] = ['date', 'patient', 'status'];
  selectedDoctor: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadDoctors();
  }

  private loadStats(): void {
    this.adminService.getStats().subscribe((data: Stats) => {
      this.stats = data;
    });
  }

  private loadDoctors(): void {
    this.adminService.getDoctors().subscribe((data: Doctor[]) => {
      this.doctors = data;
    });
  }

  onFilterChange(): void {
    this.adminService
      .getAppointmentsByDoctor(this.selectedDoctor)
      .subscribe((data: any[]) => {
        this.filteredAppointments = data;
      });
  }
}
