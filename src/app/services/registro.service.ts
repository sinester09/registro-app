import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private endpoint = 'usuarios';

  constructor(private apiService: ApiService) { }

  // Método para registrar un nuevo usuario
  registrarUsuario(usuario: any): Observable<any> {
    return this.apiService.post<any>(this.endpoint, usuario);
  }

  // Método para validar credenciales y obtener token
  login(credenciales: {email: string, password: string}): Observable<any> {
    return this.apiService.post<any>('auth/login', credenciales);
  }

  // Método para guardar el token en el servicio API
  guardarToken(token: string): void {
    this.apiService.setToken(token);
  }
}