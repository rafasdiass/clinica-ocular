import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss'],
})
export class ScheduleAppointmentComponent {
  appointmentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      fullName: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      appointmentType: ['Clínico', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  get formControls(): { [key: string]: any } {
    return this.appointmentForm.controls;
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      console.log('Consulta agendada com sucesso:', this.appointmentForm.value);
      alert('Consulta agendada com sucesso!');
      this.appointmentForm.reset();
    }
  }
}
