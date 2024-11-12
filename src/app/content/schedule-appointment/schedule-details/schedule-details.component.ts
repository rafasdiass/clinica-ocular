import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule-details',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.scss'],
})
export class ScheduleDetailsComponent implements OnInit {
  @Input() appointmentType: string | null = null; // Tipo de atendimento selecionado
  @Output() reset = new EventEmitter<void>(); // Emite evento para resetar o fluxo

  selectedDate: Date | null = null; // Propriedade para armazenar a data selecionada
  professionals = [
    { name: 'Dr. João Silva', specialty: 'Clínico Geral' },
    { name: 'Dra. Maria Oliveira', specialty: 'Oftalmologista' },
  ]; // Dados mocados temporariamente
  availableTimes = ['08:00', '08:30', '09:00', '09:30']; // Horários disponíveis

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Lógica para buscar médicos do backend
    // this.getProfessionals().subscribe((data) => {
    //   this.professionals = data;
    // });
  }

  /**
   * Função para buscar médicos do backend.
   * @returns Observable com a lista de médicos.
   */
  private getProfessionals(): Observable<any[]> {
    const apiUrl = 'https://sua-api.com/medicos'; // Substitua pela URL real do backend
    return this.http.get<any[]>(apiUrl);
  }

  /**
   * Reseta o fluxo para a seleção inicial.
   */
  onReset(): void {
    this.reset.emit();
    this.selectedDate = null;
  }
}
