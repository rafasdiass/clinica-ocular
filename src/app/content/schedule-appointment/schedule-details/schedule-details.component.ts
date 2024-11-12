import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-schedule-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatNativeDateModule, // Inclua isso
    MatOptionModule,
    MatButtonModule, // Certifique-se de que os módulos necessários estão incluídos
  ],
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.scss'],
})
export class ScheduleDetailsComponent {
  @Input() appointmentType: string | null = null; // Tipo de atendimento selecionado
  @Output() reset = new EventEmitter<void>(); // Emite evento para resetar o fluxo

  professionals = [
    { name: 'Dr. João Silva', specialty: 'Clínico Geral' },
    { name: 'Dra. Maria Oliveira', specialty: 'Oftalmologista' },
  ];

  availableTimes = ['08:00', '08:30', '09:00', '09:30']; // Horários disponíveis

  /**
   * Reseta o fluxo para a seleção inicial.
   */
  onReset(): void {
    this.reset.emit();
  }
}
