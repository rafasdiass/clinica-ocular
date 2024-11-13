import { Routes } from '@angular/router';

// Importação dos componentes de conteúdo
import { HomeComponent } from './content/home/home.component';
import { ScheduleAppointmentComponent } from './content/schedule-appointment/schedule-appointment.component';
import { ScheduleExamsComponent } from './content/schedule-exams/schedule-exams.component';
import { ScheduleReturnComponent } from './content/schedule-return/schedule-return.component';
import { ChatAssistantComponent } from './content/chat-assistant/chat-assistant.component';
import { PatientProfileComponent } from './content/patient-profile/patient-profile.component';
import { NotificationDetailsComponent } from './content/notification-details/notification-details.component';
import { LoginComponent } from './shared/components/auth/login/login.component';
import { RegisterComponent } from './shared/components/auth/register/register.component';
import { AdminLayoutComponent } from './content/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './content/admin-dashboard/admin-dashboard.component';
import { ManageDoctorsComponent } from './content/manage-doctors/manage-doctors.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página inicial
  { path: 'marcar-consulta', component: ScheduleAppointmentComponent },
  { path: 'marcar-exames', component: ScheduleExamsComponent },
  { path: 'agendar-retorno', component: ScheduleReturnComponent },
  { path: 'assistente', component: ChatAssistantComponent },
  { path: 'meu-perfil', component: PatientProfileComponent },
  { path: 'detalhes-marcacao', component: NotificationDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent, // Componente pai
    children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent }, // Dashboard inicial
      { path: 'gerenciar-medicos', component: ManageDoctorsComponent }, // Gerenciar médicos
      // Outras páginas administrativas podem ser adicionadas aqui
    ],
  },
  { path: '**', redirectTo: '' },
];
