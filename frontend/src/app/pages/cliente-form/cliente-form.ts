import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../../services/clientes';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente-form.html',
  styleUrls: ['./cliente-form.css'],
})
export class ClienteFormComponent implements OnInit {

  @Input() cliente: any = null;
  @Output() cerrar = new EventEmitter<void>();

  nombre = '';
  estado = 'Activo';

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    if (this.cliente) {
      this.nombre = this.cliente.nombre;
      this.estado = this.cliente.estado;
    }
  }

  guardar() {
    const data = {
      nombre: this.nombre,
      estado: this.estado,
    };

    if (this.cliente) {
      this.clientesService.updateCliente(this.cliente.id, data)
        .subscribe(() => this.cerrar.emit());
    } else {
      this.clientesService.crearCliente(data)
        .subscribe(() => this.cerrar.emit());
    }
  }
}