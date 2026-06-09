import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { ProyectosService } from '../../services/proyectos';

import { ClientesService } from '../../services/clientes';
import { TemplateComponent } from '../../template/template';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { GestionProyectoComponent } from '../../proyectos/gestion/gestion-proyecto';

@Component({
  selector: 'app-proyectos-list',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    TemplateComponent,
    ButtonModule,
    TableModule,
    TooltipModule,
    GestionProyectoComponent,
  ],

  templateUrl: './proyectos-list.html',
})
export class ProyectosListComponent implements OnInit {
  proyectos: any[] = [];

  clientes: any[] = [];

  filtroEstado = '';

  filtroCliente = '';

  dialogVisible = false;
  proyectoSeleccionado: any | null = null;

  constructor(
    private proyectosService: ProyectosService,
    private clientesService: ClientesService,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe((data) => {
      this.clientes = data;
    });

    this.cargarProyectos();
  }

  cargarProyectos() {
    this.proyectosService.getProyectos(this.filtroEstado, this.filtroCliente).subscribe((data) => {
      this.proyectos = data;

      this.cd.detectChanges();
    });
  }

  crearProyecto(): void {
    this.proyectoSeleccionado = null;
    this.dialogVisible = true;
  }

  editarProyecto(proyecto: any): void {
    this.proyectoSeleccionado = proyecto;
    this.dialogVisible = true;
  }

  gestionarTareas(proyecto: any): void {
    this.router.navigate(['/proyectos', proyecto.id, 'tareas']);
  }

  irAEstadisticas(): void {
    this.router.navigate(['/estadisticas']);
  }
}
