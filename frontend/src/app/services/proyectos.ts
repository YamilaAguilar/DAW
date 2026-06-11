import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProyectosService {

  private apiUrl = '/api/proyectos';

  constructor(
    private http: HttpClient
  ) {}

  getProyectos(
    estado?: string,
    clienteId?: string
  ): Observable<any[]> {

    let url = this.apiUrl;

    const params: string[] = [];

    if (estado) {
      params.push(`estado=${estado}`);
    }

    if (clienteId) {
      params.push(`clienteId=${clienteId}`);
    }

    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    return this.http.get<any[]>(url);

  }

  getProyecto(id: number): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );

  }

  createProyecto(data: any): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      data
    );

  }

  updateProyecto(
    id: number,
    data: any
  ): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/${id}`,
      data
    );

  }

}