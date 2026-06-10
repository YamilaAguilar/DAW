import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ProyectosService } from '../../services/proyectos';
import { ClientesService } from '../../services/clientes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-proyecto',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './gestion-proyecto.html',
  styleUrls: ['./gestion-proyecto.css'],
})
export class GestionProyectoComponent {
  private readonly proyectosService = inject(ProyectosService);
  private readonly clientesService = inject(ClientesService);
  private readonly router = inject(Router);

  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() proyectoSeleccionado: any | null = null;
  @Output() proyectoSeleccionadoChange = new EventEmitter<any | null>();

  @Output() guardado = new EventEmitter<void>();

  clientes: any[] = [];

  form: FormGroup = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    estado: new FormControl('Activo', { nonNullable: true }),
    clienteId: new FormControl<string | null>(null),
  });

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe((data) => {
      this.clientes = data.filter((c: any) => c.estado === 'Activo');
    });
  }

  ngOnChanges(): void {
    if (this.proyectoSeleccionado) {
      this.form.patchValue({
        nombre: this.proyectoSeleccionado.nombre,
        estado: this.proyectoSeleccionado.estado,
        clienteId: this.proyectoSeleccionado.cliente?.id ?? null,
      });
    } else {
      this.form.reset({ nombre: '', estado: 'Activo', clienteId: null });
    }
  }

  cerrar(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.proyectoSeleccionadoChange.emit(null);
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const body: any = {
      nombre: value.nombre,
      estado: value.estado,
      clienteId: value.clienteId || null,
    };

    if (this.proyectoSeleccionado) {
      this.proyectosService.updateProyecto(this.proyectoSeleccionado.id, body).subscribe({
        next: () => {
          this.guardado.emit();
          this.cerrar();
        },
        error: (err) => {
          console.error(err);
          alert('No se pudo guardar el proyecto. Verifique que el cliente esté Activo.');
        },
      });
    } else {
      this.proyectosService.createProyecto(body).subscribe({
        next: () => {
          this.guardado.emit();
          this.cerrar();
        },
        error: (err) => {
          console.error(err);
          alert('No se pudo crear el proyecto. Verifique que el cliente esté Activo.');
        },
      });
    }
  }

  gestionarClientes(): void {
    this.cerrar();
    this.router.navigate(['/clientes']);
  }
}
