import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select-appointment-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-appointment-type.component.html',
  styleUrls: ['./select-appointment-type.component.scss'],
})
export class SelectAppointmentTypeComponent {
  @Output() typeSelected = new EventEmitter<string>(); // Emite o tipo selecionado

  appointmentTypes = [
    { value: 'Clínico', label: 'Consulta Clínica' },
    { value: 'DETRAN', label: 'Medicina do Tráfego (DETRAN)' },
  ];

  /**
   * Emite o tipo de atendimento selecionado.
   * @param type Tipo selecionado
   */
  selectType(type: string): void {
    this.typeSelected.emit(type);
  }
}
