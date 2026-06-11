import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiClient } from '../../auth/auth-api-client';
import { AuthStore } from '../../auth/auth-store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  private readonly authApi = inject(AuthApiClient);
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  form = new FormGroup({
    nombreUsuario: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    clave: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  cargando = false;
  error: string | null = null;

  login(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.error = null;

    const { nombreUsuario, clave } = this.form.getRawValue();

    this.authApi.login(nombreUsuario!, clave!).subscribe({
      next: (res) => {
        this.authStore.guardarToken(res.accessToken);
        this.cargando = false;
        this.router.navigate(['/proyectos']);
      },
      error: () => {
        this.cargando = false;
        this.error = 'Credenciales incorrectas o usuario inactivo';
      },
    });
  }
}
