import { Component } from '@angular/core';
import { ScheduleDetailsComponent } from './schedule-details/schedule-details.component';
import { SelectAppointmentTypeComponent } from './select-appointment-type/select-appointment-type.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  imports: [
    CommonModule, // Necessário para *ngSwitch e outras diretivas estruturais
    ScheduleDetailsComponent,
    SelectAppointmentTypeComponent,
    MatFormFieldModule,
  ],
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss'],
})
export class ScheduleAppointmentComponent {
  currentStep: 'selectType' | 'scheduleDetails' = 'selectType'; // Etapa atual
  selectedType: string | null = null; // Tipo de atendimento selecionado

  /**
   * Avança para a etapa de detalhes após selecionar o tipo de atendimento.
   * @param type Tipo de atendimento selecionado
   */
  onTypeSelected(type: string): void {
    this.selectedType = type;
    this.currentStep = 'scheduleDetails';
  }

  /**
   * Reseta o fluxo para a seleção inicial.
   */
  resetFlow(): void {
    this.currentStep = 'selectType';
    this.selectedType = null;
  }
}
