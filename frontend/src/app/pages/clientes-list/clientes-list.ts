import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../../services/clientes';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes-list.html',
  styleUrls: ['./clientes-list.css'],
})
export class ClientesList implements OnInit {

  clientes: any[] = [];

  nombre = '';
  estado = 'Activo';

  editandoId: number | null = null;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.cargar();
  }

cargar() {
  this.clientesService.getClientes().subscribe({
    next: (data) => {
      console.log('DATA RAW:', data);
      this.clientes = [...data]; 
    },
    error: (err) => console.error(err),
  });
}

guardar() {
  if (!this.nombre || this.nombre.trim() === '') {
    alert('El nombre es obligatorio');
    return;
  }

  const data = {
    nombre: this.nombre,
    estado: this.estado,
  };

  if (this.editandoId) {
    this.clientesService.updateCliente(this.editandoId, data)
      .subscribe(() => {
        this.limpiar();
        this.cargar();
      });
  } else {
    this.clientesService.crearCliente(data)
      .subscribe(() => {
        this.limpiar();
        this.cargar();
      });
  }
}

  editar(c: any) {
    this.nombre = c.nombre;
    this.estado = c.estado;
    this.editandoId = c.id;
  }

  limpiar() {
    this.nombre = '';
    this.estado = 'Activo';
    this.editandoId = null;
  }

  darBaja(id: number) {
    this.clientesService.updateCliente(id, { estado: 'Baja' })
      .subscribe(() => this.cargar());
  }
}