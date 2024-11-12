import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faLock,
  faSignInAlt,
  faExclamationCircle,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    FontAwesomeModule,
    MatInputModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private iconLibrary: FaIconLibrary
  ) {
    // Registro dos ícones necessários
    this.iconLibrary.addIcons(
      faUser,
      faLock,
      faSignInAlt,
      faExclamationCircle,
      faUserCircle
    );

    // Configuração do formulário de login
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Manipula o envio do formulário de login.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: () => {
          console.log('Login bem-sucedido!');
          this.errorMessage = null;
        },
        error: (err) => {
          console.error('Erro no login:', err);
          this.errorMessage = 'Credenciais inválidas. Tente novamente.';
        },
      });
    }
  }
}
