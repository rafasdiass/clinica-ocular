export interface Stats {
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
  totalRevenue: number;
  completedAppointments: number; // Adicionado para indicar consultas concluídas
  canceledAppointments: number; // Adicionado para indicar consultas canceladas
}
