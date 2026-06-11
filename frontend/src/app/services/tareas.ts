import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TareaDTO {
  id: number;
  descripcion: string;
  estado: string;
}

export interface CreateTareaDTO {
  descripcion: string;
}

export interface UpdateTareaDTO {
  descripcion?: string;
  estado?: string;
}

@Injectable({ providedIn: 'root' })
export class TareasService {
  private readonly apiUrl = '/api/proyectos';

  constructor(private readonly http: HttpClient) {}

  getTareas(proyectoId: number): Observable<TareaDTO[]> {
    
    return this.http.get<TareaDTO[]>(`${this.apiUrl}/${proyectoId}/tareas`);
  }

  crearTarea(proyectoId: number, dto: CreateTareaDTO): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.apiUrl}/${proyectoId}/tareas`, dto);
  }

  actualizarTarea(proyectoId: number, tareaId: number, dto: UpdateTareaDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${proyectoId}/tareas/${tareaId}`, dto);
  }

  //eliminarTarea(proyectoId: number, tareaId: number): Observable<void> {
  //return this.http.delete<void>(`${this.apiUrl}/${proyectoId}/tareas/${tareaId}`);
 //}

 eliminarTarea(proyectoId: number, tareaId: number): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${proyectoId}/tareas/${tareaId}/baja`, {});
}
}
