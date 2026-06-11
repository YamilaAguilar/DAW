import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly tokenKey = 'accessToken';
  private readonly router: Router = inject(Router);

  obtenerToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  guardarToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  cerrarSesion(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
