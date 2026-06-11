import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '../../services/clientes';
import { TemplateComponent } from '../../template/template';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TemplateComponent,
    TableModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DialogModule,
    TooltipModule,
  ],
  templateUrl: './clientes-list.html',
  styleUrls: ['./clientes-list.css'],
})
export class ClientesList implements OnInit {
  clientes: any[] = [];

  nombre = '';
  estado = 'Activo';
  dialogVisible = false;

  estadoOpciones = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Baja', value: 'Baja' },
  ];

  editandoId: number | null = null;
  mostrarErrorNombre = false;

  constructor(private clientesService: ClientesService, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.clientesService.getClientes().subscribe({
      next: (data) => {
        this.clientes = [...data];
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  mostrarDialog() {
    this.limpiar();
    this.dialogVisible = true;
  }

  guardar() {
    if (!this.nombre || this.nombre.trim() === '') {
      this.mostrarErrorNombre = true;
      return;
    }

    const data = { nombre: this.nombre, estado: this.estado };

    if (this.editandoId) {
      this.clientesService.updateCliente(this.editandoId, data).subscribe(() => {
        this.limpiar();
        this.cargar();
      });
    } else {
      this.clientesService.crearCliente(data).subscribe(() => {
        this.limpiar();
        this.cargar();
      });
    }
  }

  editar(c: any) {
    this.nombre = c.nombre;
    this.estado = c.estado;
    this.editandoId = c.id;
    this.mostrarErrorNombre = false;
    this.dialogVisible = true;
  }

  limpiar() {
    this.nombre = '';
    this.estado = 'Activo';
    this.editandoId = null;
    this.mostrarErrorNombre = false;
    this.dialogVisible = false;
  }

  darBaja(id: number) {
    this.clientesService.updateCliente(id, { estado: 'Baja' }).subscribe({
      next: () => this.cargar(),
      error: (err) => alert(err.error.message || 'No se puede dar de baja este cliente')
    });
  }

  volver(): void {
    this.router.navigate(['/proyectos']);
  }
}
