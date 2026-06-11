import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

import { TemplateComponent } from '../../template/template';
import { ProyectosService } from '../../services/proyectos';
import { TareasService, TareaDTO } from '../../services/tareas';
import { GestionTareaComponent } from '../../tareas/gestion/gestion-tarea';

@Component({
  selector: 'app-tareas-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TableModule,
    ButtonModule,
    SelectModule,
    TemplateComponent,
    GestionTareaComponent,
  ],
  templateUrl: './tareas-list.html',
  styleUrls: ['./tareas-list.css'],
})
export class TareasListComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly proyectosService = inject(ProyectosService);
  private readonly tareasService = inject(TareasService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);

  proyectoId!: number;
  proyecto: any | null = null;
  tareas: TareaDTO[] = [];
  cargando = false;

  dialogVisible = false;
  tareaSeleccionada: TareaDTO | null = null;

  descripcionFiltro: string = '';

  estados = [
    { label: 'Todas', value: null },
    { label: 'Pendiente', value: 'PENDIENTE' },
    { label: 'Finalizada', value: 'FINALIZADA' },
    { label: 'Baja', value: 'BAJA' },
  ];

  get tareasFiltradas(): TareaDTO[] {
    if (!this.descripcionFiltro) return this.tareas;
    return this.tareas.filter(t =>
      t.descripcion.toLowerCase().includes(this.descripcionFiltro.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (!id) return;
      this.proyectoId = id;
      this.cargarProyecto();
      this.cargarTareas();
    });
  }

  cargarProyecto(): void {
    this.proyectosService.getProyecto(this.proyectoId).subscribe((data) => {
      this.proyecto = data;
      this.cdr.detectChanges();
    });
  }

  cargarTareas(): void {
    this.cargando = true;
    this.tareasService.getTareas(this.proyectoId).subscribe({
      next: (data) => {
        this.tareas = [...data];
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        console.error('Error cargando tareas:');
        this.cargando = false;
      },
    });
  }

  crearTarea(): void {
    this.tareaSeleccionada = null;
    this.dialogVisible = true;
  }

  editarTarea(tarea: TareaDTO): void {
    this.tareaSeleccionada = tarea;
    this.dialogVisible = true;
  }

  eliminarTarea(tarea: TareaDTO): void {
    if (!confirm('¿Seguro que querés eliminar esta tarea?')) return;
    this.tareasService.eliminarTarea(this.proyectoId, tarea.id).subscribe(() => {
      this.cargarTareas();
    });
  }

  exportarCSV(): void {
   const nombreProyecto = this.proyecto?.nombre ?? 'Sin nombre';
   const nombreCliente = this.proyecto?.cliente?.nombre ?? 'Proyecto interno';
   const estadoProyecto = this.proyecto?.estado ?? '-';

   const encabezadoProyecto = [
     `Proyecto: ${nombreProyecto}`,
     `Cliente: ${nombreCliente}`,
     `Estado del proyecto: ${estadoProyecto}`,
     '',
     'Tareas:', 
     'ID,Descripción,Estado',
    ] ;

   const filas = this.tareas.map(t => `${t.id},${t.descripcion},${t.estado}`);

   const contenido = [...encabezadoProyecto, ...filas].join('\n');

   const blob = new Blob(['\ufeff' + contenido], { type: 'text/csv;charset=utf-8;' });
   const url = URL.createObjectURL(blob);
   const link = document.createElement('a');
   link.href = url;
   link.download = `tareas-proyecto-${new Date().getFullYear()}.csv`;
   link.click();
   URL.revokeObjectURL(url);
  }

  volver(): void {
    this.router.navigate(['/proyectos']);
  }
}