import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { TareasService, TareaDTO } from '../../services/tareas';

@Component({
  selector: 'app-gestion-tarea',
  standalone: true,
  imports: [CommonModule, DialogModule, InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './gestion-tarea.html',
  styleUrls: ['./gestion-tarea.css'],
})
export class GestionTareaComponent implements OnChanges {
  private readonly tareasService = inject(TareasService);

  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() proyectoId!: number;

  @Input() tareaSeleccionada: TareaDTO | null = null;
  @Output() tareaSeleccionadaChange = new EventEmitter<TareaDTO | null>();

  @Output() guardado = new EventEmitter<void>();

  estados = [
    { label: 'Pendiente', value: 'PENDIENTE' },
    { label: 'Finalizada', value: 'FINALIZADA' },
    { label: 'Baja', value: 'BAJA' },
  ];

  form = new FormGroup({
    descripcion: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    estado: new FormControl('PENDIENTE', { nonNullable: true }),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tareaSeleccionada']) {
      if (this.tareaSeleccionada) {
        this.form.patchValue({
          descripcion: this.tareaSeleccionada.descripcion,
          estado: this.tareaSeleccionada.estado,
        });
      } else {
        this.form.reset({ descripcion: '', estado: 'PENDIENTE' });
      }
    }
  }

  cerrar(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.tareaSeleccionadaChange.emit(null);
  }

  guardar(): void {
    if (this.form.invalid || !this.proyectoId) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (this.tareaSeleccionada) {
      this.tareasService
        .actualizarTarea(this.proyectoId, this.tareaSeleccionada.id, {
          descripcion: value.descripcion || undefined,
          estado: value.estado || undefined,
        })
        .subscribe(() => {
          this.guardado.emit();
          this.cerrar();
        });
    } else {
      this.tareasService
        .crearTarea(this.proyectoId, { descripcion: value.descripcion || '' })
        .subscribe(() => {
          this.guardado.emit();
          this.cerrar();
        });
    }
  }
}
