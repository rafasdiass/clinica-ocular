import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Patient } from '../../shared/models/patient.model';
import { PatientService } from '../../shared/services/patient.service';
import { Observable } from 'rxjs';
import { Appointment } from '../../shared/models/appointment.model';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent implements OnInit {
  profileForm!: FormGroup; // Formulário reativo
  appointmentHistory$: Observable<Appointment[]> = new Observable(); // Histórico de agendamentos

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadPatientData();
    this.loadAppointmentHistory();
  }

  /**
   * Inicializa o formulário com validações.
   */
  private initForm(): void {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      birthDate: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Carrega os dados do paciente e popula o formulário.
   */
  private loadPatientData(): void {
    this.patientService.getPatientData().subscribe((data: Patient) => {
      this.profileForm.patchValue(data);
    });
  }

  /**
   * Carrega o histórico de agendamentos do paciente.
   */
  private loadAppointmentHistory(): void {
    this.appointmentHistory$ = this.patientService.getAppointmentHistory();
  }

  /**
   * Salva as alterações no perfil do paciente.
   */
  onSave(): void {
    if (this.profileForm.valid) {
      const updatedPatient: Partial<Patient> = this.profileForm.value;
      this.patientService.updatePatientData(updatedPatient).subscribe(() => {
        alert('Dados atualizados com sucesso!');
      });
    }
  }
}
