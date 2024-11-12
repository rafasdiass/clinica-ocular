Aqui está o arquivo README.md atualizado com todos os componentes, serviços, modelos e descrições detalhadas:

```markdown
# Clínica de Olhos - Sistema de Marcação de Consultas

![Clínica de Olhos](./src/assets/banner.jpg)

## Descrição

Bem-vindo ao **Sistema de Marcação de Consultas** da **Clínica de Olhos**! Esta aplicação web permite que pacientes agendem consultas, exames e retornos de forma fácil e rápida. Além disso, oferece funcionalidades como um assistente virtual para ajudar nas dúvidas dos usuários e um perfil personalizado para cada paciente acompanhar seu histórico de atendimentos.

---

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Como Rodar](#como-rodar)
- [Estrutura do Projeto](#estrutura-do-projeto)
  - [Componentes](#componentes)
  - [Serviços](#serviços)
  - [Modelos](#modelos)
- [Funcionalidades](#funcionalidades)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Desenvolvedor](#desenvolvedor)

---

## Tecnologias Utilizadas

- **Angular 18**: Framework principal para desenvolvimento da aplicação.
- **TypeScript**: Linguagem de programação utilizada no desenvolvimento com Angular.
- **RxJS**: Biblioteca para programação reativa.
- **CSS**: Estilização da aplicação.
- **HTML5**: Estruturação das páginas.
- **Node.js & npm**: Gerenciamento de pacotes e execução do ambiente de desenvolvimento.

---

## Pré-requisitos

Antes de começar, certifique-se de que você possui as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (versão 14 ou superior): [Download Node.js](https://nodejs.org/)
- **npm** (vem com o Node.js)
- **Angular CLI** (versão 18 ou superior)

Verifique as versões instaladas executando os comandos abaixo no seu terminal:

```bash
node -v
npm -v
ng version
```

Se o Angular CLI não estiver instalado ou estiver desatualizado, instale-o globalmente com o seguinte comando:

```bash
npm install -g @angular/cli
```

---

## Instalação

1. **Clone o Repositório**

   Clone este repositório para o seu ambiente local usando o comando `git clone`:

   ```bash
   git clone https://github.com/seu-usuario/clinica-de-olhos.git
   ```

2. **Acesse a Pasta do Projeto**

   Navegue até a pasta do projeto:

   ```bash
   cd clinica-de-olhos
   ```

3. **Instale as Dependências**

   Instale todas as dependências necessárias utilizando o npm:

   ```bash
   npm install
   ```

---

## Como Rodar

Após a instalação, siga os passos abaixo para executar a aplicação em modo de desenvolvimento:

1. **Inicie o Servidor de Desenvolvimento**

   Execute o comando abaixo para iniciar o servidor de desenvolvimento:

   ```bash
   ng serve
   ```

   Ou, alternativamente:

   ```bash
   npm start
   ```

2. **Acesse a Aplicação no Navegador**

   Abra o seu navegador e acesse o endereço:

   ```
   http://localhost:4200
   ```

   A aplicação estará disponível e pronta para uso.

---

## Estrutura do Projeto

A estrutura de pastas do projeto está organizada da seguinte forma:

```
clinica-de-olhos/
├── src/
│   ├── app/
│   │   ├── content/
│   │   │   ├── chat-assistant/
│   │   │   ├── home/
│   │   │   ├── notification-details/
│   │   │   ├── patient-profile/
│   │   │   ├── schedule-appointment/
│   │   │   ├── schedule-exams/
│   │   │   └── schedule-return/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── footer/
│   │   │   │   └── header/
│   │   │   ├── models/
│   │   │   └── services/
│   │   ├── app.component.ts
│   │   └── app.routing.ts
│   ├── assets/
│   └── environments/
├── angular.json
├── package.json
└── README.md
```

---

### Componentes

#### Componentes de Conteúdo

1. **HomeComponent**
   - **Caminho:** `src/app/content/home/`
   - **Descrição:** Página inicial que apresenta a clínica, seus serviços e uma chamada para ação para marcar consultas.

2. **ScheduleAppointmentComponent**
   - **Caminho:** `src/app/content/schedule-appointment/`
   - **Descrição:** Formulário para agendamento de consultas clínicas ou no DETRAN.

3. **ScheduleExamsComponent**
   - **Caminho:** `src/app/content/schedule-exams/`
   - **Descrição:** Formulário para agendamento de exames específicos, como Fundoscopia, Campo Visual, Biometria e Acuidade Visual.

4. **ScheduleReturnComponent**
   - **Caminho:** `src/app/content/schedule-return/`
   - **Descrição:** Formulário para agendamento de consultas de retorno.

5. **ChatAssistantComponent**
   - **Caminho:** `src/app/content/chat-assistant/`
   - **Descrição:** Assistente virtual (chatbot) para auxiliar os pacientes com dúvidas e orientações.

6. **PatientProfileComponent**
   - **Caminho:** `src/app/content/patient-profile/`
   - **Descrição:** Área personalizada onde os pacientes podem visualizar e editar suas informações pessoais e histórico de atendimentos.

7. **NotificationDetailsComponent**
   - **Caminho:** `src/app/content/notification-details/`
   - **Descrição:** Página para visualizar detalhes de marcações específicas e adicionar eventos ao Google Calendar.

#### Componentes Compartilhados

1. **HeaderComponent**
   - **Caminho:** `src/app/shared/components/header/`
   - **Descrição:** Barra de navegação superior presente em todas as páginas, com links para as principais seções da aplicação.

2. **FooterComponent**
   - **Caminho:** `src/app/shared/components/footer/`
   - **Descrição:** Rodapé presente em todas as páginas, contendo informações de contato e links para redes sociais.

---

### Serviços

1. **AppointmentService**
   - **Caminho:** `src/app/shared/services/appointment.service.ts`
   - **Descrição:** Gerencia operações relacionadas a consultas, como criação, obtenção e cancelamento de consultas.

2. **ExamsService**
   - **Caminho:** `src/app/shared/services/exams.service.ts`
   - **Descrição:** Gerencia operações relacionadas a exames, incluindo criação, obtenção e cancelamento de exames.

3. **PatientService**
   - **Caminho:** `src/app/shared/services/patient.service.ts`
   - **Descrição:** Gerencia operações relacionadas ao perfil do paciente, como obtenção e atualização de informações pessoais.

4. **NotificationService**
   - **Caminho:** `src/app/shared/services/notification.service.ts`
   - **Descrição:** Gerencia operações relacionadas a notificações, como envio e obtenção de notificações.

---

### Modelos

1. **Appointment**
   - **Descrição:** Estrutura de uma consulta agendada.

2. **Exam**
   - **Descrição:** Estrutura de um exame agendado.

3. **Patient**
   - **Descrição:** Estrutura do perfil do paciente com histórico de atendimentos.

4. **Notification**
   - **Descrição:** Estrutura de notificações relacionadas aos agendamentos.

---

## Funcionalidades

1. **Marcação de Consultas**
2. **Assistente Virtual**
3. **Notificações ao Paciente**

---

## Desenvolvedor

- Nome
- Email
```