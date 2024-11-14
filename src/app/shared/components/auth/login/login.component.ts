import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { NavigationService } from '../../../services/navigation.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faUserCircle,
  faEnvelope,
  faLock,
  faSignInAlt,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FontAwesomeModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navigationService: NavigationService, // Usando o NavigationService
    private library: FaIconLibrary
  ) {
    this.library.addIcons(
      faUserCircle,
      faEnvelope,
      faLock,
      faSignInAlt,
      faExclamationCircle
    );

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Realiza login.
   */
  login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accessToken);
          this.navigateBasedOnRole(response.accessToken);
        },
        error: (err) => {
          this.errorMessage = 'Email ou senha inválidos. Tente novamente.';
          console.error(err);
        },
      });
    }
  }

  /**
   * Navega para a rota com base no perfil do usuário (role).
   */
  private navigateBasedOnRole(token: string): void {
    const payload = this.decodeToken(token);
    const role = payload.role;

    switch (role) {
      case 'admin':
        this.navigationService.navigateToRoute('/content/admin-dashboard');
        break;
      case 'doctor':
        this.navigationService.navigateToRoute('/content/doctor-dashboard');
        break;
      case 'patient':
        this.navigationService.navigateToRoute('/content/patient-profile');
        break;
      case 'employee':
        this.navigationService.navigateToRoute('/content/employee-dashboard');
        break;
      default:
        this.errorMessage =
          'Permissão inválida. Entre em contato com o suporte.';
        this.navigationService.navigateToRoute('/');
    }
  }

  /**
   * Navega para a rota de registro.
   */
  goToRegister(): void {
    this.navigationService.navigateToRoute('/register');
  }

  /**
   * Decodifica o token JWT.
   */
  private decodeToken(token: string): any {
    const payloadBase64 = token.split('.')[1];
    return JSON.parse(atob(payloadBase64));
  }
}
