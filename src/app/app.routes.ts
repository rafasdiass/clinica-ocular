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

// Definição das rotas
export const routes: Routes = [
  { path: '', component: HomeComponent }, // Rota raiz que direciona para a página inicial
  { path: 'marcar-consulta', component: ScheduleAppointmentComponent }, // Página para marcar consultas
  { path: 'marcar-exames', component: ScheduleExamsComponent }, // Página para marcar exames
  { path: 'agendar-retorno', component: ScheduleReturnComponent }, // Página para agendar retornos
  { path: 'assistente', component: ChatAssistantComponent }, // Página do assistente virtual
  { path: 'meu-perfil', component: PatientProfileComponent }, // Página do perfil do paciente
  { path: 'detalhes-marcacao', component: NotificationDetailsComponent }, // Página de detalhes da marcação
  { path: 'login', component: LoginComponent }, // Página de login
  { path: 'register', component: RegisterComponent }, // Página de cadastro
  { path: '**', redirectTo: '' }, // Redireciona para a página inicial em caso de rota inválida
];
