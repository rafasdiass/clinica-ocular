import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>
      {{ data.editing ? 'Editar Médico' : 'Adicionar Médico' }}
    </h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>Nome</mat-label>
        <input matInput formControlName="name" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>CRM</mat-label>
        <input matInput formControlName="crm" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Especialidade</mat-label>
        <input matInput formControlName="specialty" />
      </mat-form-field>

      <div mat-dialog-actions>
        <button mat-button type="button" (click)="onCancel()">Cancelar</button>
        <button mat-raised-button color="primary" type="submit">Salvar</button>
      </div>
    </form>
  `,
})
export class DoctorDialogComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DoctorDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { doctor?: any; editing: boolean }
  ) {
    this.form = this.fb.group({
      name: [data.doctor?.name || '', [Validators.required]],
      crm: [data.doctor?.crm || '', [Validators.required]],
      specialty: [data.doctor?.specialty || '', [Validators.required]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
