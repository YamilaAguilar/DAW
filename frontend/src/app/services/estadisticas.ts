import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ResumenEstadisticas {
  proyectosActivos: number;
  tareasPendientes: number;
  proyectosPorCliente: { cliente: string; cantidad: number }[];
}

@Injectable({ providedIn: 'root' })
export class EstadisticasService {
  private readonly apiUrl = '/api/proyectos/estadisticas/resumen';

  constructor(private readonly http: HttpClient) {}

  getResumen(): Observable<ResumenEstadisticas> {
    return this.http.get<ResumenEstadisticas>(this.apiUrl);
  }
}
