import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserData } from '../../../models/app-user.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  /**
   * Valida se as senhas são iguais.
   */
  private passwordMatchValidator(
    group: FormGroup
  ): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  /**
   * Envia os dados de registro.
   */
  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData: Partial<UserData> = {
        name: this.registerForm.value.fullName,
        email: this.registerForm.value.email,
        phoneNumber: this.registerForm.value.phone,
        cpf: this.registerForm.value.cpf,
        password: this.registerForm.value.password,
      };

      this.userService.createUser(userData, { role: 'patient' }).subscribe({
        next: () => {
          this.successMessage = 'Cadastro realizado com sucesso!';
          this.errorMessage = null;
          this.registerForm.reset();
        },
        error: (err: unknown) => {
          console.error('Erro no cadastro:', err);
          this.errorMessage =
            'Ocorreu um erro ao realizar o cadastro. Tente novamente.';
        },
      });
    }
  }
}
