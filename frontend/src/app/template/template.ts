import { Component, inject } from '@angular/core';
import { AuthStore } from '../auth/auth-store';

@Component({
  selector: 'app-template',
  standalone: true,
  templateUrl: './template.html',
  styleUrls: ['./template.css'],
})
export class TemplateComponent {
  private readonly authStore: AuthStore = inject(AuthStore);

  cerrarSesion(): void {
    this.authStore.cerrarSesion();
  }
}
