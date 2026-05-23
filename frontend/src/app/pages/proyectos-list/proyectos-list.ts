import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { ProyectosService } from '../../services/proyectos';

import { ClientesService } from '../../services/clientes';

@Component({
  selector: 'app-proyectos-list',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './proyectos-list.html',
})

export class ProyectosListComponent implements OnInit {

  proyectos: any[] = [];

  clientes: any[] = [];

  filtroEstado = '';

  filtroCliente = '';

  constructor(
    private proyectosService: ProyectosService,
    private clientesService: ClientesService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.clientesService.getClientes().subscribe(data => {

      this.clientes = data;

    });

    this.cargarProyectos();

  }

  cargarProyectos() {

    this.proyectosService
      .getProyectos(
        this.filtroEstado,
        this.filtroCliente
      )
      .subscribe(data => {

        this.proyectos = data;

        this.cd.detectChanges();

      });

  }

}