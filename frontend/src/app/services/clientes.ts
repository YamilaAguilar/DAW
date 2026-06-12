import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {

  private apiUrl = 'http://localhost:4000/api/clientes';

  constructor(private http: HttpClient) {}

  // GET CLIENTES (con filtros)
  getClientes(nombre?: string, estado?: string): Observable<any[]> {
    let params = new HttpParams();

    if (nombre) {
      params = params.set('nombre', nombre);
    }

    if (estado) {
      params = params.set('estado', estado);
    }

    return this.http.get<any[]>(this.apiUrl, { params });
  }

  // POST CLIENTE
  crearCliente(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  // PUT CLIENTE
  editarCliente(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // PUT específico
  updateCliente(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}