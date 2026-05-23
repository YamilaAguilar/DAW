import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientesService } from '../../services/clientes';
import { ProyectosService } from '../../services/proyectos';

@Component({
  selector: 'app-proyecto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proyecto-form.html',
})
export class ProyectoFormComponent implements OnInit {

  clientes: any[] = [];
  
  modoEdicion = false;

proyectoId: number | null = null;

  proyecto = {
    nombre: '',
    estado: 'Activo',
    clienteId: ''
  };

  constructor(
    private clientesService: ClientesService,
    private proyectosService: ProyectosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

 ngOnInit(): void {

  this.clientesService.getClientes().subscribe(data => {

    this.clientes = data.filter(
      c => c.estado === 'Activo'
    );

  });

  const id = this.route.snapshot.paramMap.get('id');

  if (id) {

    this.modoEdicion = true;

    this.proyectoId = Number(id);

    this.proyectosService.getProyecto(this.proyectoId)
      .subscribe(data => {

        this.proyecto = {
          nombre: data.nombre,
          estado: data.estado,
          clienteId: data.cliente?.id || ''
        };

      });

  }

}

  guardarProyecto() {

  const data = {
    nombre: this.proyecto.nombre,
    estado: this.proyecto.estado,
    clienteId: this.proyecto.clienteId || null
  };

  if (this.modoEdicion && this.proyectoId) {

    this.proyectosService
      .updateProyecto(this.proyectoId, data)
      .subscribe({

        next: () => {

          alert('Proyecto actualizado');

          window.location.href = '/proyectos';

        },

        error: (err) => {

          console.error(err);

          alert('Error actualizando proyecto');

        }

      });

  } else {

    this.proyectosService
      .createProyecto(data)
      .subscribe({

        next: () => {

          alert('Proyecto creado');

          window.location.href = '/proyectos';

        },

        error: (err) => {

          console.error(err);

          alert('Error creando proyecto');

        }

      });

  }

}
}