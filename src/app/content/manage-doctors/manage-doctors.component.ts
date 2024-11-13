import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Doctor, Schedule } from '../../shared/models/doctor.model';
import { DoctorService } from '../../shared/services/doctor.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-manage-doctors',
  standalone: true,
  templateUrl: './manage-doctors.component.html',
  styleUrls: ['./manage-doctors.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
  ],
})
export class ManageDoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  displayedColumns: string[] = ['name', 'specialty', 'actions'];
  selectedDoctor: Doctor | null = null;
  isDoctorDialogOpen = false;
  scheduleForm!: FormGroup;
  doctorForm!: FormGroup;
  weekDays = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];

  constructor(private doctorService: DoctorService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.initForms();
  }

  private initForms(): void {
    this.scheduleForm = this.fb.group({
      doctor: [null, Validators.required],
      day: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });

    this.doctorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      crm: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      specialty: ['', Validators.required],
    });
  }

  private loadDoctors(): void {
    this.doctorService.getDoctors().subscribe((data: Doctor[]) => {
      this.doctors = data;
    });
  }

  openAddDoctorForm(): void {
    this.isDoctorDialogOpen = true;
    this.selectedDoctor = null;
    this.doctorForm.reset();
  }

  openEditDoctorForm(doctor: Doctor): void {
    this.isDoctorDialogOpen = true;
    this.selectedDoctor = doctor;
    this.doctorForm.patchValue(doctor);
  }

  onDoctorFormSubmit(): void {
    if (this.doctorForm.valid) {
      const doctorData = this.doctorForm.value;

      if (this.selectedDoctor) {
        this.doctorService
          .updateDoctor(this.selectedDoctor.id, doctorData)
          .subscribe(() => {
            this.loadDoctors();
            this.closeDoctorDialog();
          });
      } else {
        this.doctorService.addDoctor(doctorData).subscribe(() => {
          this.loadDoctors();
          this.closeDoctorDialog();
        });
      }
    }
  }

  selectDoctorForSchedule(doctor: Doctor): void {
    this.selectedDoctor = doctor;
    this.scheduleForm.patchValue({ doctor });
  }

  onScheduleSubmit(): void {
    if (this.scheduleForm.valid) {
      const { doctor, day, startTime, endTime } = this.scheduleForm.value;
      const schedules = this.doctorService.generateTimeSlots(
        startTime,
        endTime,
        30, // Duração da consulta
        15 // Pausa entre consultas
      );

      const scheduleData: Schedule = { day, schedules };

      this.doctorService.addSchedule(doctor.id, scheduleData).subscribe(() => {
        this.loadDoctors();
        this.scheduleForm.reset();
      });
    }
  }

  removeSchedule(schedule: Schedule): void {
    if (this.selectedDoctor) {
      this.doctorService
        .removeSchedule(this.selectedDoctor.id, schedule)
        .subscribe(() => {
          this.loadDoctors();
        });
    }
  }

  blockSchedule(schedule: Schedule): void {
    if (this.selectedDoctor) {
      this.doctorService
        .blockSchedule(this.selectedDoctor.id, schedule)
        .subscribe(() => {
          this.loadDoctors();
        });
    }
  }

  deleteDoctor(doctorId: string): void {
    this.doctorService.deleteDoctor(doctorId).subscribe(() => {
      this.loadDoctors();
    });
  }

  closeDoctorDialog(): void {
    this.isDoctorDialogOpen = false;
  }
}
